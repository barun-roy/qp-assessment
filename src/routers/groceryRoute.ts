import { Router } from "express";
import groceryController from "../controllers/groceryController";

const router = Router();

router.post("/grocery", groceryController.addGroceryItem);
router.get("/grocery", groceryController.getGroceryItems);
router.delete("/grocery/:id", groceryController.removeGroceryItem);
router.put("/grocery/:id", groceryController.updateGroceryItem);
router.patch("/grocery/:id/inventory", groceryController.updateInventory);

export default router;
