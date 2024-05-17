import { ValidateJWT } from "../utils/tokenUtilities.js";

const authenticate = async (req, res, next) => {
    const payload = await ValidateJWT(req, res);
    console.log("authenticated");
    req.user = payload;
    next();
  };

  export default authenticate;