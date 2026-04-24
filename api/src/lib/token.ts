import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import { config } from "../config";
import type { User } from "../models/client";

export function generateAuthTokens(user: User) {
  const payload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtAccesExpireIn, audience: "access" });
  const refreshUniqueId = crypto.randomBytes(128).toString("base64");
  const refreshToken = jwt.sign(
    { refreshId: refreshUniqueId },
    config.jwtSecret,
    { expiresIn: config.jwtRefreshExpireIn, audience: "refresh" },
  );

  return {
    accessToken: {
      token: accessToken,
      expiresIn: 15 * 60 * 1000,
    },
    refreshToken: {
      token: refreshToken,
      expiresIn: 7 * 24 * 60 * 60 * 1000,
    },
  };
}