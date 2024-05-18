import { Router } from "express";
import groceryController from "../controllers/groceryController";
import { validateDto } from "../middleware/validate";
import { CreateGroceryItemDto } from "../dtos/groceryItem.dto";
import auth from "../middleware/auth";

const router = Router();

router.post(
  "/create",
  auth.authMiddleware,
  auth.isAdmin,
  validateDto(CreateGroceryItemDto),
  groceryController.create
);
router.post("/update/:id", groceryController.updateGroceryItem);
router.post("/update/:id/inventory", groceryController.updateInventory);
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

router.get(
  "/list",
  auth.authMiddleware,
  auth.isAdmin,
  groceryController.groceryList
);

export default router;
