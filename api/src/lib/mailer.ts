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

export async function sendResetPasswordEmail(email: string, token: string) {
    await transporter.sendMail({
        from: config.emailUser,
        to: email,
        subject: "Réinitialisation de ton mot de passe SkillFusion",
        html: `
            <h2>Réinitialisation de mot de passe</h2>
            <p>Clique sur ce lien pour réinitialiser ton mot de passe :</p>
            <a href="http://localhost:5173/page-reset-mdp?token=${token}">
                Réinitialiser mon mot de passe
            </a>
            <p>Ce lien est valable 1 heure.</p>
            <p>Si tu n'as pas demandé cette réinitialisation, ignore cet email.</p>
        `,
    });
}