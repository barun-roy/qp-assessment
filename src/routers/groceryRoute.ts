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
  groceryController.addGroceryItem
);
router.post("/update/:id", groceryController.updateGroceryItem);
router.post("/update/:id/inventory", groceryController.updateInventory);
router.post("/remove/:id", groceryController.removeGroceryItem);

router.get("/groceryList", groceryController.getGroceryItems);

export default router;
