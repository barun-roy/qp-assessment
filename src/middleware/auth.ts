import jwt from "jsonwebtoken";
import { ResponseService } from "../common/response.service";
import { NextFunction, Request, Response } from "express";
import { AuthUser } from "../../types/user";

const responseService = new ResponseService();

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return responseService.sent(res, 401, [], "Unauthorized!");
    }
    const decoded = jwt.verify(
      token,
      "0fb46e81c559d1f94cfaf4c5d3c0912e"
    ) as AuthUser;
    req.user = decoded;

    next();
  } catch (error) {
    return responseService.sent(res, 401, [], "Unauthorized!");
  }
};

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    let authToken: AuthUser | undefined = req.user;
    if (authToken) {
      if (authToken.role !== "admin") {
        console.log("authToken", authToken);
        return responseService.sent(res, 403, [], "Forbidden");
      }
      next();
    }
  } catch (error: any) {
    console.log("is admin middleware error............", error);
    return responseService.sent(res, 500, [], error.message);
  }
};

export default { authMiddleware, isAdmin };
