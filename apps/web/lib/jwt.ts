import { JWTPayload, jwtVerify, SignJWT } from "jose";

const secretKey = process.env.SECRET_KEY;
const encodedKey = new TextEncoder().encode(secretKey);

const createToken = async (
  payload: JWTPayload,
  tokenExpiry?: string | number | Date
) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(tokenExpiry || process.env.SESSION_EXPIRY || "30m")
    .sign(encodedKey);
};

const verifyToken = async (token: string) => {
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

export { createToken, verifyToken };
