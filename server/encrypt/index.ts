import crypto, { scryptSync } from "crypto";
import dotenv from "dotenv";
dotenv.config();

const ENCRYPT_INFO = {
  algorithm: "aes-256-ctr",
  codification: "utf8",
  secret: process.env.SECRET_KEY as string,
  type: "base64",
};

export const encrypt = (password: string) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    ENCRYPT_INFO.algorithm,
    Buffer.from(ENCRYPT_INFO.secret, "base64"),
    iv
  );

  let encrypted = cipher.update(password);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return iv.toString("hex") + ":" + encrypted.toString("hex");
};

export const decrypt = (passwordEncrypt: string) => {
  const textParts = passwordEncrypt.split(":");
  const iv = Buffer.from(textParts.shift()!, "hex");
  const encryptedText = Buffer.from(textParts.join(":"), "hex");
  const decipher = crypto.createDecipheriv(
    ENCRYPT_INFO.algorithm,
    Buffer.from(ENCRYPT_INFO.secret, "base64"),
    iv
  );

  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString("utf8");
};
