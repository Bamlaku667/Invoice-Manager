import jwt from "jsonwebtoken";
import { TOKEN_EXPIRY, TOKEN_KEY } from "../config.js";
import { UnautorizedError } from "../errors/index.js";

const GenerateJWT = async (res, tokenData) => {
  const token = await jwt.sign(tokenData, TOKEN_KEY, {
    expiresIn: TOKEN_EXPIRY,
  });
  res.cookie("jwt", token, {
    //security  options
    httpOnly: true,
    // secure: NODE_ENV !== "developement",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 1000,
  });
  return token;
};

const ValidateJWT = async (res) => {
  let token = await res.cookies.jwt;
  if (token ) {
    try {
      const payload = jwt.verify(token, TOKEN_KEY);
      return payload;
    } catch (err) {
      throw new Error("Not Authorized");
    }
  }
  throw new UnautorizedError("No token");
};

export { GenerateJWT, ValidateJWT };
