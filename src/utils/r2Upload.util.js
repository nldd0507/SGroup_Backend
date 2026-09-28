import { PutObjectCommand } from "@aws-sdk/client-s3";
import { r2Client } from "../config/r2.config.js";
import path from "path";
import { config } from "../config/.env.config.js";

export const uploadToR2 = async (file, folder = "images") => {
  const ext = path.extname(file.originalname).toLowerCase();

  const uniqueFilename = `${folder}/${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;

  const command = new PutObjectCommand({
    Bucket: config.r2.bucketName,
    Key: uniqueFilename,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  await r2Client.send(command);

  return `${config.r2.publicUrl}/${uniqueFilename}`;
}