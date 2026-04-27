import prisma from "~~/lib/prisma";
import type { Folder, Post } from "@prisma/client";

export type BreadcrumbsType = {
    name: string;
    path: string;
    folderId: null | string;
}[];

export type FetchResponse =
    | ({
          type: "post";
          currentBreadcrumbs: BreadcrumbsType;
      } & Post)
    | {
          type: "folder";
          currentSlug: BreadcrumbsType;
          posts: Post[];
          folders: Folder[];
      };

export default defineEventHandler(async (event) => {
    const slugRaw = getRouterParams(event).slug;
    const segments = slugRaw?.split("/").filter(Boolean) || [];

    // 1. Fetch all folders and the potential post in parallel
    // Since slugs are unique globally in the current schema, we can fetch them directly
    const [allFolders, potentialPost] = await Promise.all([
        prisma.folder.findMany({
            where: { slug: { in: segments } },
        }),
        prisma.post.findFirst({
            where: { slug: segments[segments.length - 1] },
        }),
    ]);

    const folderMap = new Map(allFolders.map((f) => [f.slug, f]));
    const breadcrumbs: BreadcrumbsType = [];
    let currentParentId: string | null = null;

    // 2. Validate the path and build breadcrumbs
    for (const [i, segment] of segments.entries()) {
        const isLast = i === segments.length - 1;

        const folder = folderMap.get(segment);

        // Check if it's a post at the last segment
        if (isLast && potentialPost && potentialPost.folderId === currentParentId) {
            return {
                type: "post",
                currentBreadcrumbs: breadcrumbs,
                ...potentialPost,
            } satisfies FetchResponse;
        }

        // Validate folder existence and hierarchy
        if (!folder || folder.parentId !== currentParentId) {
            throw createError({
                status: 404,
                statusMessage: `Path segment "${segment}" not found in expected hierarchy`,
            });
        }

        currentParentId = folder.id;
        breadcrumbs.push({
            name: folder.name,
            path: (breadcrumbs.length === 0 ? "" : breadcrumbs[breadcrumbs.length - 1]?.path) + "/" + folder.slug,
            folderId: folder.id,
        });
    }

    // 3. If we reached here, it's a folder
    const [subFolders, posts] = await Promise.all([
        prisma.folder.findMany({ where: { parentId: currentParentId } }),
        prisma.post.findMany({ where: { folderId: currentParentId } }),
    ]);

    return {
        type: "folder",
        currentSlug: breadcrumbs,
        folders: subFolders,
        posts,
    } satisfies FetchResponse;
});