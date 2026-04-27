import prisma from "~~/lib/prisma";

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    if (!id) throw createError({ status: 400 });

    const folder = await prisma.folder.findUnique({
        where: { id }
    });

    if (folder === null) throw createError({ status: 404 });

    const [folders, posts] = await Promise.all([
        prisma.folder.findMany({
            where: { parentId: id }
        }),
        prisma.post.findMany({
            where: { folderId: id }
        })
    ]);

    return {
        ...folder,
        folders,
        posts
    };
});
