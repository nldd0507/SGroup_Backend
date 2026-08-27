import { Router } from "express";
import * as userController from "../controller/users.controller.js";

const router = Router();

router.get("/", userController.getAllUsers);
router.get("/:id/", userController.getUserById);
router.post("/", userController.createUser);
router.delete("/:id", userController.deleteUser);
router.put("/:id", userController.updateUser);

export default router;