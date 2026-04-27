import { verifyPassword } from "~~/lib/auth";

const PASSWORD_HASH = process.env.PASSWORD_HASH || "";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const password = body.password;
    
    if (!password) {
        throw createError({
            status: 400,
            statusText: "Missing password",
        });
    }

    if (!PASSWORD_HASH || !verifyPassword(password, PASSWORD_HASH)) {
        throw createError({
            status: 401,
            statusText: "Invalid password",
        });
    }

    // On crée la session sécurisée
    await setUserSession(event, {
        user: {
            role: 'admin'
        }
    });

    return { status: "success" };
});
