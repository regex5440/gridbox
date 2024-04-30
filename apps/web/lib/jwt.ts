import { JWTPayload, jwtVerify, SignJWT } from "jose";

const secretKey = process.env.SECRET_KEY;
const encodedKey = new TextEncoder().encode(secretKey);

const createEncryptedToken = async (
  payload: JWTPayload,
  tokenExpiry?: string | number | Date
) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(
      tokenExpiry || Number(process.env.SESSION_EXPIRY) || "7d"
    )
    .sign(encodedKey);
};

const decryptToken = async <T>(
  token: string
): Promise<(T & JWTPayload) | JWTPayload | null> => {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (e) {
    console.log("TokenVerificationFailed", e);
    return null;
  }
};

export { createEncryptedToken, decryptToken };
