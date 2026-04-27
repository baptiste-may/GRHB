import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public/uploads");

export default defineEventHandler(async (event) => {
    // Vérification de la session
    const session = await getUserSession(event);
    if (!session.user) {
        throw createError({ status: 401, statusText: "Unauthorized" });
    }

    try {
        const formData = await readMultipartFormData(event);
        if (!formData) throw createError({ status: 400, statusText: "No form data" });

        const fileData = formData.find(item => item.name === 'file');
        if (!fileData) throw createError({ status: 400, statusText: "No file uploaded" });

        // 1. Validation de la taille (5Mo)
        const MAX_SIZE = 5 * 1024 * 1024;
        if (fileData.data.length > MAX_SIZE) {
            throw createError({ status: 400, statusText: "Le fichier est trop lourd (max 5Mo)" });
        }

        // 2. Validation de l'extension
        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
        const ext = path.extname(fileData.filename || '').toLowerCase();
        
        if (!allowedExtensions.includes(ext)) {
            throw createError({ status: 400, statusText: "Format de fichier non autorisé" });
        }

        if (!fileData.type?.startsWith("image/")) {
            throw createError({ status: 400, statusText: "File is not an image" });
        }

        // Ensure upload directory exists
        if (!existsSync(UPLOAD_DIR)) {
            await mkdir(UPLOAD_DIR, { recursive: true });
        }

        // Sanitize filename and add timestamp/random to prevent collisions
        const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}${ext}`;
        const filepath = path.join(UPLOAD_DIR, filename);

        await writeFile(filepath, fileData.data);

        const url = `/uploads/${filename}`;
        return { url };

    } catch (error) {
        console.error("Upload error:", error);
        const err = error as { statusCode?: number, statusMessage?: string };
        throw createError({
            status: err.statusCode || 500,
            statusText: err.statusMessage || "Internal Server Error"
        });
    }
});
