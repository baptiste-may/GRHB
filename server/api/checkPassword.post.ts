import { verifyPassword } from "~~/lib/auth";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const password = body.password;
    
    if (!password) {
        throw createError({
            status: 400,
            statusText: "Missing password",
        });
    }

    if (!ADMIN_PASSWORD || !verifyPassword(password, ADMIN_PASSWORD)) {
        throw createError({
            status: 401,
            statusText: "Invalid password",
        });
    }

    // Create the secure session
    await setUserSession(event, {
        user: {
            role: 'admin'
        }
    });

    return { status: "success" };
});
