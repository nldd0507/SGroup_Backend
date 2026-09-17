import jwt from "jsonwebtoken";
import { config } from "../config/.env.config.js";

export const generateAccessToken = (payload) => {
    return jwt.sign(payload, config.jwt.secret, {
        expiresIn: config.jwt.expiresIn || "1d",
    });
};

export const generateRefreshToken = (payload) => {
    return jwt.sign(payload, config.jwt.secret, {
        expiresIn: config.jwt.refreshTokenIn || "7d",
    })
}

export const verifyToken = (token) => {
    return jwt.verify(token, config.jwt.secret);
};