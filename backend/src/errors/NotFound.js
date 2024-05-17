import { CustomError } from "./index.js";
import { StatusCodes } from "http-status-codes";
class NotFound extends CustomError {
  constructor(message) {
    super(message, StatusCodes.NOT_FOUND);
  }
}

export default NotFound;