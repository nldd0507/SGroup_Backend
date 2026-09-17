import * as userController from "../controller/users.controller.js";
import { Router } from "express";

const router = Router();

router.get("/", userController.getAllUsers);
router.get("/:id/", userController.getUserById);
router.post("/", userController.createUser);
router.delete("/:id", userController.deleteUser);
router.put("/:id", userController.updateUser);

export default router;