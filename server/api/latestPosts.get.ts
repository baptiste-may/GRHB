import prisma from "~~/lib/prisma";
import Parser from "rss-parser";
import type { UnifiedPost } from "~~/lib/types";

const extractImage = (content: string): string | null => {
    const match = content.match(/!\[.*?\]\((.*?)\)/);
    return match ? (match[1] || null) : null;
};

interface ExtendedParserItem extends Parser.Item {
    enclosure?: { url: string };
    "media:content"?: { $: { url: string } };
}

export default defineEventHandler(async (_event) => {
    // 1. Fetch local posts and all folders to rebuild paths in memory (avoids N+1)
    const postsPromise = prisma.post.findMany({
        where: { folderId: { not: null } },
        take: 12,
        orderBy: { createdAt: "desc" },
    });

    const foldersPromise = prisma.folder.findMany();
    
    // 2. RSS Feed with caching
    const storage = useStorage("cache");
    const CACHE_KEY = "facebook_rss_feed";
    const feedUrl = process.env.FACEBOOK_RSS;
    
    let rssPosts: UnifiedPost[] = (await storage.getItem<UnifiedPost[]>(CACHE_KEY)) || [];

    if (rssPosts.length === 0 && feedUrl) {
        try {
            const parser = new Parser();
            const feed = await parser.parseURL(feedUrl);
            rssPosts = (feed.items as ExtendedParserItem[]).map((item) => {
                let imageUrl = item.enclosure?.url || item["media:content"]?.$.url;

                if (!imageUrl && item.content) {
                    const match = item.content.match(/<img[^>]+src="([^">]+)"/);
                    if (match && match[1]) {
                        imageUrl = match[1].replace(/&amp;/g, "&");
                    }
                }

                return {
                    id: item.guid || item.link || crypto.randomUUID(),
                    title: item.title || "Sans titre",
                    slug: "",
                    content: item.contentSnippet || item.content || "",
                    author: item.creator || "Facebook",
                    createdAt: new Date(item.pubDate || new Date()),
                    updatedAt: new Date(item.pubDate || new Date()),
                    path: item.link || "",
                    isExternal: true,
                    coverImage: imageUrl || null,
                    folderId: null,
                };
            });
            // Cache for 15 minutes
            await storage.setItem(CACHE_KEY, rssPosts, { ttl: 900 });
        } catch (error) {
            console.error("Error fetching RSS feed:", error);
        }
    }

    const [posts, allFolders] = await Promise.all([postsPromise, foldersPromise]);
    const folderMap = new Map(allFolders.map(f => [f.id, f]));

    const getFullFolderPath = (folderId: string | null): string => {
        if (!folderId) return "";
        let path = "";
        let currentId: string | null = folderId;
        const visited = new Set(); 

        while (currentId && !visited.has(currentId)) {
            visited.add(currentId);
            const folder = folderMap.get(currentId);
            if (!folder) break;
            path = "/" + folder.slug + path;
            currentId = folder.parentId;
        }
        return path;
    };

    const postsWithPaths: UnifiedPost[] = posts.map((post) => ({
        ...post,
        path: getFullFolderPath(post.folderId),
        isExternal: false,
        coverImage: extractImage(post.content)
    }));

    const allPosts = [...postsWithPaths, ...rssPosts];
    allPosts.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    return allPosts.slice(0, 12);
});
