import prisma from "~~/lib/prisma";

export default defineEventHandler(async (event) => {
    const session = await getUserSession(event);
    if (!session.user) throw createError({ status: 401 });

    const id = getRouterParam(event, 'id');
    if (!id) throw createError({ status: 400 });

    try {
        await prisma.folder.delete({ where: { id } });
        return { status: "ok" };
    } catch (err) {
        console.error(err);
        throw createError({ status: 500 });
    }
});
