import { Response } from "express";

export class ResponseService {
  sent(res: Response, code: number, data: any, message?: any) {
    /**
     * Successful response  200-299
     * Redirection response 300-399
     * Client error response 400-499
     * Server error response 500-599
     */
    switch (code) {
      case 200 /**Success */:
        res
          .status(code)
          .send({
            success: true,
            message: message ? message : "Success",
            data,
          });
        break;
      case 201 /**Created */:
        res
          .status(code)
          .send({
            success: true,
            message: message ? message : "Created",
            data,
          });
        break;
      case 400 /**Bad request */:
        res
          .status(code)
          .send({ success: false, message: message ? message : "Bad request" });
        break;
      case 401 /**Unauthorized */:
        res
          .status(code)
          .send({
            success: false,
            message: message ? message : "Un Authorized",
          });
        break;
      case 403 /**Forbidden */:
        res
          .status(code)
          .send({
            success: false,
            message: message ? message : "Forbidden",
          });
        break;
      case 404 /**Not found */:
        res
          .status(code)
          .send({ success: false, message: message ? message : "Not Found" });
        break;
      case 409 /**Conflict request */:
        res
          .status(code)
          .send({
            success: false,
            message: message ? message : "Duplicate data found",
          });
        break;
      case 500 /**Internal server error */:
        res
          .status(code)
          .send({
            success: false,
            message: message ? message : "Internal Server error",
          });
        break;
      case 503 /**Service unavailable */:
        res
          .status(code)
          .send({ success: false, message: "Service unavailable" });
        break;
      default:
        res
          .status(500)
          .send({ success: false, message: "Something went wrong" });
    }
  }
}
