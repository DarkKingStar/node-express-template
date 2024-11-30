import "dotenv/config";
import jwt from "jsonwebtoken";

export const generateToken = (payload, time) => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: time });

export const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);

export default { generateToken, verifyToken };