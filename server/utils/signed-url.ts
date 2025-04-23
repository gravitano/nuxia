// ~/server/utils/signed-url.ts
const SECRET_KEY = process.env.EMAIL_SECRET_KEY || "your-super-secret-key";
import { createHmac } from "node:crypto";

function encodeBase64(obj: object) {
  return Buffer.from(JSON.stringify(obj)).toString("base64url");
}

function decodeBase64(str: string) {
  return JSON.parse(Buffer.from(str, "base64url").toString());
}

function sign(data: object): string {
  const payload = encodeBase64(data);
  const signature = createHmac("sha256", SECRET_KEY)
    .update(payload)
    .digest("base64url");

  return `${payload}.${signature}`;
}

function verify(token: string): any | null {
  const [payload, signature] = token.split(".");
  const expectedSig = createHmac("sha256", SECRET_KEY)
    .update(payload)
    .digest("base64url");

  if (signature !== expectedSig) return null;
  return decodeBase64(payload);
}

export { sign, verify };
