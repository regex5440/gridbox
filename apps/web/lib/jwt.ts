import type { JWTPayload } from "jose";
import { jwtVerify, SignJWT } from "jose";

const secretKey = process.env.SECRET_KEY;
const encodedKey = new TextEncoder().encode(secretKey);

const createEncryptedToken = async (
  payload: JWTPayload,
  tokenExpiry?: string | number | Date
) => {
  return new SignJWT({ ...payload, issuedBy: "https://hdxdev.in" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(
      tokenExpiry ||
        Date.now() + Number(process.env.SESSION_EXPIRY) * 1000 ||
        "7d"
    )
    .sign(encodedKey);
};

const decryptToken = async <T>(
  token: string
): Promise<(T & JWTPayload) | JWTPayload | null> => {
  try {
    // const  = await
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    });
    if (payload.issuedBy !== "https://hdxdev.in") {
      throw new Error("Token issuer is invalid");
    }
    return payload;
  } catch (e) {
    // console.error(e);
    return null;
  }
};

export { createEncryptedToken, decryptToken };
