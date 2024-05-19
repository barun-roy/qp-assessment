import { Request, Response } from "express";
import db from "../models";
import { ResponseService } from "../common/response.service";
import {
  CreateGroceryItemDto,
  UpdateGroceryItemDto,
  UpdateQuantityDto,
} from "../dtos/groceryItem.dto";
import { Op } from "sequelize";
const responseService = new ResponseService();

/**
 *
 * @param req
 * @param res
 * @returns
 */

const bulkInsert = async (req: Request, res: Response) => {
  try {
    let authToken = req.user;
    let userId = authToken.userId;
    let dateTime = new Date().toISOString();
    let names = req.body.map((item: any) => {
      item.created_by = userId;
      item.created_at = dateTime;
      item.updated_at = dateTime;
      return item.name;
    });

    let existingGroceries = await db.tbl_grocery_masters.findAll({
      where: {
        name: names,
      },
      attributes: ["name"],
    });

    existingGroceries = JSON.parse(JSON.stringify(existingGroceries, null, 2));

    let existingNames = existingGroceries.map(
      (grocery: { name: string }) => grocery.name
    );

    let newGroceries = req.body.filter(
      (item: { name: string }) => !existingNames.includes(item.name)
    );

    if (newGroceries.length > 0) {
      await db.tbl_grocery_masters.bulkCreate(req.body);
      return responseService.sent(res, 200, [], "Data inserted successfully");
    }
    return responseService.sent(res, 200, [], "Grocery items already exists");
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
    let duplicateCheck = await db.tbl_grocery_masters.findOne({
      where: { name },
    });
    if (duplicateCheck) {
      return responseService.sent(res, 409, [], "Grocery Item already exists!");
    }
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
  let authToken = req.user;
  let userId = authToken.userId;
  try {
    const groceryData = await db.tbl_grocery_masters.findAll({
      attributes: ["id", "name", "price", "quantity", "created_by"],
      include: [
        {
          model: db.tbl_user_masters,
          as: "createdByVal",
          attributes: ["id", "first_name", "last_name", "email"],
          required: false,
        },
      ],
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

const deleteGrocery = async (req: Request, res: Response) => {
  const transaction = await db.sequelize.transaction();
  try {
    const groceryId = req.body.id || null;
    let authToken = req.user;
    let userId = authToken.userId;
    let dateTime = new Date().toISOString();
    let checkIfExists = await db.tbl_grocery_masters.findOne({
      where: { id: groceryId },
    });
    if (!checkIfExists) {
      return responseService.sent(res, 200, [], "No such items exists");
    }
    let groceryUserItem = await db.tbl_grocery_user_mappings.findOne({
      where: { grocery_id: groceryId },
    });
    groceryUserItem = JSON.parse(JSON.stringify(groceryUserItem, null, 2));
    if (groceryUserItem) {
      await db.tbl_grocery_user_mappings.update(
        { deleted_at: dateTime, deleted_by: userId },
        { where: { grocery_id: groceryId }, transaction }
      );
    }
    await db.tbl_grocery_masters.update(
      { deleted_at: dateTime, deleted_by: userId },
      { where: { id: groceryId }, transaction }
    );
    await transaction.commit();
    return responseService.sent(res, 200, [], "Deleted successfully!");
  } catch (error: any) {
    console.log("remove grocery items error................", error);
    await transaction.rollback();
    return responseService.sent(res, 500, [], error.message);
  }
};

/**
 *
 * @param req
 * @param res
 * @returns
 */

const updateGrocery = async (req: Request, res: Response) => {
  const { grocery_id, name, price } = req.body as UpdateGroceryItemDto;
  let authToken = req.user;
  let userId = authToken.userId;
  let dateTime = new Date().toISOString();
  try {
    let updateFields: { [key: string | number]: any } = {};
    if (!grocery_id) {
      return responseService.sent(res, 400, [], "Grocery Id is required");
    }

    if (name !== undefined) updateFields.name = name;
    if (price !== undefined) updateFields.price = price;

    if (Object.keys(updateFields).length === 0) {
      return responseService.sent(res, 400, [], "No fields to update");
    }

    const updated = await db.tbl_grocery_masters.update(
      { ...updateFields, updated_at: dateTime, updated_by: userId },
      {
        where: { id: grocery_id },
      }
    );

    if (updated[0] === 0) {
      return responseService.sent(res, 200, [], "Grocery item not found");
    }
    return responseService.sent(
      res,
      200,
      [],
      "Grocery item updated successfully"
    );
  } catch (error: any) {
    console.log("update inventory item error................", error);
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
  const { grocery_id, quantity } = req.body as UpdateQuantityDto;
  let authToken = req.user;
  let userId = authToken.userId;
  let dateTime = new Date().toISOString();
  try {
    // let minQuantityVal = 0;
    // let searchGroceryUser = await db.tbl_grocery_user_mappings.findAll({
    //   where: { grocery_id: groceryId },
    //   attributes: ["quantity"],
    // });
    // searchGroceryUser = JSON.parse(JSON.stringify(searchGroceryUser, null, 2));
    // let quantityArr = searchGroceryUser.map((item: any) => item.quantity);
    // if(quantityArr && quantityArr.length > 0){
    //     minQuantityVal = minValue(quantityArr)
    // }
    // if(minQuantityVal < quantity){
    //     await db.tbl_grocery_user_mappings.update({deleted_at:dateTime, deleted_by:userId,})
    // }
    if (!grocery_id) {
      return responseService.sent(res, 400, [], "Grocery Id is required");
    }
    if (!quantity) {
      return responseService.sent(res, 400, [], "Quantity cannot be empty");
    }
    const updated = await db.tbl_grocery_masters.update(
      { quantity, updated_at: dateTime, updated_by: userId },
      {
        where: { id: grocery_id },
      }
    );

    if (updated[0] === 0) {
      return responseService.sent(res, 200, [], "Grocery item not found");
    }
    return responseService.sent(
      res,
      200,
      [],
      "Grocery quantity updated successfully"
    );
  } catch (error: any) {
    console.log("update grocery items error................", error);
    return responseService.sent(res, 500, [], error.message);
  }
};

// function minValue(arr: number[]) {
//   let min = Infinity;
//   for (let i = 0; i < arr.length; i++) {
//     if (min > arr[i]) {
//       min = arr[i];
//     }
//   }
//   return min;
// }

const groceryController = {
  create,
  groceryList,
  deleteGrocery,
  updateGrocery,
  updateInventory,
  bulkInsert,
};

export default groceryController;
