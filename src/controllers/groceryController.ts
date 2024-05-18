import { Request, Response } from "express";
import db from "../models";
import { ResponseService } from "../common/response.service";
import { CreateGroceryItemDto } from "../dtos/groceryItem.dto";
const responseService = new ResponseService();

/**
 *
 * @param req
 * @param res
 * @returns
 */

const bulkInsert = async (req: Request, res: Response) => {
  try {
    await db.tbl_grocery_masters.bulkCreate(req.body);
    return responseService.sent(res, 200, [], "Data inserted successfully");
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

const create = async (req: Request, res: Response) => {
  try {
    const { name, price, quantity } = req.body as CreateGroceryItemDto;
    let authToken = req.user;
    let userId = authToken.userId;
    let dateTime = new Date().toISOString();
    const newItem = await db.tbl_grocery_masters.create({
      name,
      price,
      quantity,
      created_by: userId,
      created_at: dateTime,
      updated_at: dateTime,
    });
    return responseService.sent(res, 200, newItem);
  } catch (error: any) {
    console.log("add grocery item error................", error);
    return responseService.sent(res, 500, [], error.message);
  }
};

/**
 *
 * @param req
 * @param res
 * @returns
 */

const groceryList = async (req: Request, res: Response) => {
  try {
    const groceryData = await db.tbl_grocery_masters.findAll({
      attributes: ["id", "name", "price", "quantity", "created_by"],
      //   include: [
      //     {
      //       model: db.tbl_user_masters,
      //       as: "grocery_user",
      //       through: { attributes: [] },
      //       attributes: ["id", "first_name", "last_name", "email"],
      //       required: false,
      //     },
      //   ],
    });
    return responseService.sent(res, 200, groceryData);
  } catch (error: any) {
    console.log("get grocery items error................", error);
    return responseService.sent(res, 500, [], error.message);
  }
};

/**
 *
 * @param req
 * @param res
 * @returns
 */

const removeGroceryItem = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    console.log("remove grocery items error................", error);
    return responseService.sent(res, 500, [], error.message);
  }
};

/**
 *
 * @param req
 * @param res
 * @returns
 */

const updateGroceryItem = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    console.log("update grocery items error................", error);
    return responseService.sent(res, 500, [], error.message);
  }
};

/**
 *
 * @param req
 * @param res
 * @returns
 */

const updateInventory = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    console.log("update inventory item error................", error);
    return responseService.sent(res, 500, [], error.message);
  }
};

const groceryController = {
  create,
  groceryList,
  removeGroceryItem,
  updateGroceryItem,
  updateInventory,
  bulkInsert,
};

export default groceryController;
