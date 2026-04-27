import prisma from "~~/lib/prisma";

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    if (!id) throw createError({ status: 400 });

    const post = await prisma.post.findUnique({
        where: { id }
    });

    if (post === null) throw createError({ status: 404 });

    return post;
});
