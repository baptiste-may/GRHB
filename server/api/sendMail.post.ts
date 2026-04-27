import nodemailer from "nodemailer";
import { EmailSchema } from "~~/lib/schemas";

const EMAIL_USER = process.env.EMAIL_USER || "";
const EMAIL_HOST = process.env.EMAIL_HOST || "";
const EMAIL_PORT = parseInt(process.env.EMAIL_PORT || "465");
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || "";

const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: true,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD
    }
});

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    // 1. Validation Zod (inclut le Honeypot)
    const result = EmailSchema.safeParse(body);
    if (!result.success) {
        throw createError({
            status: 400,
            statusText: "Données invalides",
            data: result.error.format()
        });
    }

    const {name, email, subject, content} = result.data;

    try {
        await transporter.verify();
    } catch {
        throw createError({
            status: 500,
            statusText: "Erreur de configuration mail",
        });
    }

    try {
        await transporter.sendMail({
            from: `"${name} - ${email}" <${EMAIL_USER}>`,
            to: EMAIL_USER,
            subject: `[CONTACT] ${subject}`,
            text: content
        });
        return { status: "success" };
    } catch {
        throw createError({
            status: 500,
            statusText: "Erreur lors de l'envoi du mail",
        });
    }
});