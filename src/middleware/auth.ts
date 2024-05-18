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
    req.user = decoded

    next();
  } catch (error) {
    return responseService.sent(res, 401, [], "Unauthorized!");
  }
};

export default { authMiddleware };
