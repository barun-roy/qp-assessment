import express from "express";
import userController from "../controllers/userController";
import auth from "../middleware/auth";

const router = express.Router();

router.post("/create", userController.createUsers);
router.post("/login", userController.login);
router.post("/bookGrocery", auth.authMiddleware, userController.bookGrocery);

router.get(
  "/getUser/:user_id?",
  auth.authMiddleware,
  auth.isAdmin,
  userController.getUsers
);
router.get("/groceryList", auth.authMiddleware, userController.showGroceryList);

export default router;
