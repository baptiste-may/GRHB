import prisma from "~~/lib/prisma";
import { createSlug } from "~~/lib/utils";
import { PostSchema } from "~~/lib/schemas";

export default defineEventHandler(async (event) => {
    const session = await getUserSession(event);
    if (!session.user) throw createError({ status: 401 });

    const body = await readBody(event);
    const result = PostSchema.safeParse(body);

    if (!result.success) {
        throw createError({
            status: 400,
            statusText: "Validation Error",
            data: result.error.format()
        });
    }

    const { title, content, author, folderId } = result.data;

    try {
        await prisma.post.create({
            data: {
                title,
                slug: createSlug(title),
                content,
                author,
                folderId: folderId || null
            }
        });
        return { status: "ok" };
    } catch (err) {
        console.error(err);
        throw createError({ status: 500 });
    }
});
