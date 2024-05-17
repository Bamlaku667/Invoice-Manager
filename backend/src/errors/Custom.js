export default class CustomError extends Error {
  constructor(message, statuscode) {
    super(message);
    this.statusCode = statuscode;
  }
}
