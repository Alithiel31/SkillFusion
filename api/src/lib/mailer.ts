import nodemailer from "nodemailer";
import { config } from "../config";

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: config.emailUser,
        pass: config.emailPass,
    },
});

export async function sendVerificationEmail(email: string, token: string) {
    await transporter.sendMail({
        from: config.emailUser,
        to: email,
        subject: "Confirme ton inscription sur SkillFusion",
        html: `
            <h2>Bienvenue sur SkillFusion !</h2>
            <p>Clique sur ce lien pour confirmer ton compte :</p>
            <a href="http://localhost:5173/verify?token=${token}">
                Confirmer mon compte
            </a>
            <p>Ce lien est valable 24h.</p>
        `,
    });
}