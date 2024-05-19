import { Router } from "express";
import groceryController from "../controllers/groceryController";
import { validateDto } from "../middleware/validate";
import {
  CreateGroceryItemDto,
  UpdateGroceryItemDto,
  UpdateQuantityDto,
} from "../dtos/groceryItem.dto";
import auth from "../middleware/auth";

const router = Router();

/***
 * POST
 */

router.post(
  "/create",
  auth.authMiddleware,
  auth.isAdmin,
  validateDto(CreateGroceryItemDto),
  groceryController.create
);
router.post(
  "/update",
  auth.authMiddleware,
  auth.isAdmin,
  validateDto(UpdateGroceryItemDto),
  groceryController.updateGrocery
);
router.post(
  "/update/inventory",
  auth.authMiddleware,
  auth.isAdmin,
  validateDto(UpdateQuantityDto),
  groceryController.updateInventory
);
router.post(
  "/remove",
  auth.authMiddleware,
  auth.isAdmin,
  groceryController.deleteGrocery
);
router.post(
  "/bulkInsert",
  auth.authMiddleware,
  auth.isAdmin,
  groceryController.bulkInsert
);

/**
 * GET
 */

router.get(
  "/list",
  auth.authMiddleware,
  auth.isAdmin,
  groceryController.groceryList
);

export default router;
