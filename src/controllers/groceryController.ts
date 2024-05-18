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

const addGroceryItem = async (req: Request, res: Response) => {
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

const getGroceryItems = async (req: Request, res: Response) => {
  try {
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
  addGroceryItem,
  getGroceryItems,
  removeGroceryItem,
  updateGroceryItem,
  updateInventory,
};

export default groceryController;
