import { CustomError } from "../errors/index.js";
import {StatusCodes} from 'http-status-codes'; 
const errorHandler = async (err, req, res, next) => {
  console.log(err);
  if (err instanceof CustomError) {
    // console.log("status: ", err.statusCode);
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({  msg: err });
};

export default errorHandler;
