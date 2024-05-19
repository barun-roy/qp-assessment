import { Request, Response } from "express";
import db from "../models";
import { ResponseService } from "../common/response.service";
import commonService from "../common/common.service";
import authController from "./authController";
import { BookingDto } from "../dtos/groceryItem.dto";
const responseService = new ResponseService();

/**
 *
 * @param req
 * @param res
 * @returns
 */

const createUsers = async (req: Request, res: Response) => {
  try {
    let { first_name, last_name, email, password, role } = req.body;
    let dateTime = new Date().toISOString();

    if (!first_name || !last_name || !email || !password) {
      responseService.sent(res, 400, [], "Fields are required!");
    }

    let duplicateUserCheck = await db.tbl_user_masters.findOne({
      where: { email },
    });

    if (duplicateUserCheck) {
      return responseService.sent(res, 409, [], "User already exists!");
    }

    let hashedPassword: string = await commonService.hashPassword(password);

    await db.tbl_user_masters.create({
      role,
      first_name,
      last_name,
      email,
      password: hashedPassword,
      created_at: dateTime,
    });
    return responseService.sent(res, 200, [], "User Created Successfully!");
  } catch (error: any) {
    console.log("user create error............", error);
    return responseService.sent(res, 500, [], error.message);
  }
};

/**
 *
 * @param req
 * @param res
 * @returns
 */

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return responseService.sent(
        res,
        400,
        [],
        "Please enter both email and password"
      );
    }

    const user = await db.tbl_user_masters.findOne({
      where: { email },
    });

    if (!user) {
      return responseService.sent(res, 404, [], "No user found!");
    }

    let validPassword = await commonService.passwordCheck(
      password,
      user.password
    );
    if (!validPassword) {
      return responseService.sent(res, 400, [], "Password is invalid");
    }

    const token = authController.signToken(res, user);
    return responseService.sent(res, 200, { token });
  } catch (error: any) {
    console.log("login error.......................", error);
    return responseService.sent(res, 500, [], error.message);
  }
};

/**
 *
 * @param req
 * @param res
 * @returns
 */

const getUsers = async (req: Request, res: Response) => {
  try {
    let userId = req.query.user_id || null;
    let whereCondition: any = {};
    if (userId) {
      whereCondition.id = userId;
    }
    let userData = await db.tbl_user_masters.findAll({
      where: { ...whereCondition },
      attributes: ["first_name", "last_name", "email", "role"],
    });
    return responseService.sent(res, 200, userData);
  } catch (error: any) {
    console.log("get users error............", error);
    return responseService.sent(res, 500, [], error.message);
  }
};

/**
 *
 * @param req
 * @param res
 * @returns
 */

const showGroceryList = async (req: Request, res: Response) => {
  let authToken = req.user;
  let role = authToken.role;
  try {
    const groceryData = await db.tbl_grocery_masters.findAll({
      attributes: ["id", "name", "price", "quantity"],
    });
    return responseService.sent(res, 200, groceryData);
  } catch (error: any) {
    return responseService.sent(res, 500, [], error.message);
  }
};

/**
 *
 * @param req
 * @param res
 * @returns
 */

const bookGrocery = async (req: Request, res: Response) => {
  const { items } = req.body as BookingDto;
  const transaction = await db.sequelize.transaction();
  let authToken = req.user;
  let userId = authToken.userId;
  let dateTime = new Date().toISOString();
  let booked = false;
  try {
    for (let item of items) {
      const grocery = await db.tbl_grocery_masters.findOne({
        where: { id: item.grocery_id },
        logging: false,
      });

      if (!grocery) {
        continue;
      }
      if (grocery.quantity < item.quantity) {
        continue;
      }

      await db.tbl_grocery_user_mappings.create(
        {
          grocery_id: item.grocery_id,
          quantity: item.quantity,
          created_by: userId,
          created_at: dateTime,
          updated_at: dateTime,
        },
        { transaction }
      );

      await db.tbl_grocery_masters.update(
        {
          quantity: grocery.quantity - item.quantity,
          updated_at: dateTime,
          updated_by: userId,
        },
        { where: { id: item.grocery_id }, transaction }
      );
      booked = true;
    }
    if (booked) {
      await transaction.commit();
      return responseService.sent(
        res,
        201,
        [],
        "Groceries Booked Successfully!"
      );
    } else {
      await transaction.rollback();
      return responseService.sent(res, 400, [], "No groceries booked");
    }
  } catch (error: any) {
    console.log("error in grocery booking...............", error);
    await transaction.rollback();
    return responseService.sent(res, 500, [], error.message);
  }
};

const userController = {
  createUsers,
  login,
  getUsers,
  showGroceryList,
  bookGrocery,
};

export default userController;
