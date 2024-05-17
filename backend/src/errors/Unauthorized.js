import { CustomError } from "./index.js";
import { StatusCodes } from "http-status-codes";
class Unauthorized extends CustomError {
  constructor(message) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}

export default Unauthorized;
