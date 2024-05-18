import jwt from "jsonwebtoken";
import { ResponseService } from "../common/response.service";
import { Response } from "express";
const responseService = new ResponseService();

const signToken = (res: Response, user: any) => {
  try {
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      "0fb46e81c559d1f94cfaf4c5d3c0912e",
      { expiresIn: "1h" }
    );
    return token;
  } catch (error: any) {
    console.log("sign token error..........", error);
    return responseService.sent(res, 500, [], error.message);
  }
};

export default { signToken };
