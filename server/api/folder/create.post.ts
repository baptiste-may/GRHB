import prisma from "~~/lib/prisma";
import { createSlug } from "~~/lib/utils";
import { FolderSchema } from "~~/lib/schemas";

export default defineEventHandler(async (event) => {
    const session = await getUserSession(event);
    if (!session.user) throw createError({ status: 401 });

    const body = await readBody(event);
    const result = FolderSchema.safeParse(body);

    if (!result.success) {
        throw createError({
            status: 400,
            statusText: "Validation Error",
            data: result.error.format()
        });
    }

    const { name, parentId } = result.data;

    try {
        await prisma.folder.create({
            data: {
                name,
                slug: createSlug(name),
                parentId: parentId || null
            }
        });
        return { status: "ok" };
    } catch (err) {
        console.error(err);
        throw createError({ status: 500 });
    }
});
