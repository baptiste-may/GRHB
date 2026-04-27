import prisma from "~~/lib/prisma";
import { createSlug } from "~~/lib/utils";
import { FolderSchema } from "~~/lib/schemas";

export default defineEventHandler(async (event) => {
    const session = await getUserSession(event);
    if (!session.user) throw createError({ status: 401 });

    const id = getRouterParam(event, 'id');
    if (!id) throw createError({ status: 400 });

    const body = await readBody(event);
    // On n'attend que le nom pour l'edit simple d'après le code existant
    const result = FolderSchema.pick({ name: true }).safeParse(body);

    if (!result.success) {
        throw createError({
            status: 400,
            statusText: "Validation Error",
            data: result.error.format()
        });
    }

    const { name } = result.data;

    try {
        await prisma.folder.update({
            where: { id },
            data: {
                name,
                slug: createSlug(name)
            }
        });
        return { status: "ok" };
    } catch (err) {
        console.error(err);
        throw createError({ status: 500 });
    }
});
