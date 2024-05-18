import { Request, Response } from "express";
import db from "../models";
import { ResponseService } from "../common/response.service";
import commonService from "../common/common.service";
import authController from "./authController";
const responseService = new ResponseService();

/**
 *
 * @param req
 * @param res
 * @returns
 */

const addGroceryItem = async (req: Request, res: Response) => {
  try {
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
