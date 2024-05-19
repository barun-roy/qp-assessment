import express from "express";
import userController from "../controllers/userController";
import auth from "../middleware/auth";

const router = express.Router();

router.post("/create", userController.createUsers);
router.post("/login", userController.login);

router.get(
  "/getUser/:user_id?",
  auth.authMiddleware,
  auth.isAdmin,
  userController.getUsers
);

export default router;
