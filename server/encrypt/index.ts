import crypto from "crypto";

const ENCRYPT_INFO = {
  algorithm: "aes-256-ctr",
  codification: "utf8",
  secret: crypto.randomBytes(32),
  type: "hex",
};

export const encrypt = (password: string) => {
  const crypto = require("crypto");
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    ENCRYPT_INFO.algorithm,
    ENCRYPT_INFO.secret,
    iv
  );

  let encrypted = cipher.update(password);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return iv.toString("hex") + ":" + encrypted.toString("hex");
};

export const decrypt = (passwordEncrypt: string) => {
  const crypto = require("crypto");

  const textParts = passwordEncrypt.split(":");
  const iv = Buffer.from(textParts.shift()!, "hex");
  const encryptedText = Buffer.from(textParts.join(":"), "hex");
  const decipher = crypto.createDecipheriv(
    ENCRYPT_INFO.algorithm,
    Buffer.from(ENCRYPT_INFO.secret.toString("hex"), "hex"),
    iv
  );

  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString("utf8");
};
