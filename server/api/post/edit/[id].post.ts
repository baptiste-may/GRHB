import prisma from "~~/lib/prisma";
import { createSlug } from "~~/lib/utils";
import { PostSchema } from "~~/lib/schemas";

export default defineEventHandler(async (event) => {
    // Session verification
    const session = await getUserSession(event);
    if (!session.user) {
        throw createError({ status: 401, statusText: "Unauthorized" });
    }

    const id = getRouterParam(event, 'id');
    if (!id) throw createError({ status: 400 });

    const body = await readBody(event);
    const result = PostSchema.safeParse(body);

    if (!result.success) {
        throw createError({
            status: 400,
            statusText: "Validation Error",
            data: result.error.format()
        });
    }

    const { title, content, author } = result.data;

    try {
        await prisma.post.update({
            where: { id },
            data: {
                title,
                slug: createSlug(title),
                content,
                author
            }
        });
        return { status: "ok" };
    } catch (err) {
        console.error(err);
        throw createError({ status: 500 });
    }
});
