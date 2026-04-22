import type { Request, Response } from "express"
import argon2 from "argon2";
import { z } from "zod";
import { prisma, User } from "../models/client";
import { config } from "../config";
import type { Token } from "../@types/index.d.ts";
import { BadRequestError, ConflictError, UnauthorizedError } from "../lib/errors";
import { generateAuthTokens } from "../lib/token";
import jwt from "jsonwebtoken";


// Token management functions

function setAccessTokenCookie(res: Response, accessToken: Token) {
    res.cookie("accessToken", accessToken.token, {
        httpOnly: true,
        secure: config.isProd,
        sameSite: config.isProd ? "none" : "lax",
        maxAge: accessToken.expiresIn,
    });
}

function setRefreshTokenCookie(res: Response, refreshToken: Token) {
    res.cookie("refreshToken", refreshToken.token, {
        httpOnly: true,
        secure: config.isProd,
        sameSite: config.isProd ? "none" : "lax",
        maxAge: refreshToken.expiresIn,
        path: "/api/auth/refresh",
    });
}

async function replaceRefreshTokenInDatabase(refreshToken: Token, user: User) {
    await prisma.refreshToken.deleteMany({ where: { userId: user.id } });
    await prisma.refreshToken.create({
        data: {
            token: refreshToken.token,
            userId: user.id,
        },
    });
}
// Register controller
export async function registerUser(req: Request, res: Response) {
    const registerUserBodySchema = z.object({
        firstname: z.string().min(3),
        lastname: z.string().min(2),
        email: z.email(),
        password: z
            .string()
            .min(12)
            .max(100)
            .regex(/[a-z]/)
            .regex(/[A-Z]/)
            .regex(/[!@#$%&*-+{}?]/),
        confirm: z.string(),
    });

    // Vérifier le typage d'entrée
    const { firstname, lastname, email, password, confirm } =
        await registerUserBodySchema.parseAsync(req.body);

    // verifier pwd/confirmation
    if (password !== confirm) {
        throw new BadRequestError(
            "Mot de passe et confirmation ne correspondent pas",
        );
    }
    // vérifier que l'email est unique
    const existingUser = await prisma.user.findFirst({ where: { email } });
    if (existingUser) {
        throw new ConflictError("Email déjà utilisé");
    }
    // Hasher le password
    const hashedPassword = await argon2.hash(password);

  // crée l'utilisateur en db
  const user = await prisma.user.create({
    data: {
      firstname,
      lastname,
      email,
      password: hashedPassword,
    },
  });
  res.status(201).json({
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    created_at: user.createdAt,
    updated_at: user.updatedAt,
  });

}
