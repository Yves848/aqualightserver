import express from "npm:express";
import { createUser, deleteUser, getUser, getUsers, updateUser } from "../controllers/user.ts";

const router = express.Router();

router.get("/", getUsers);

router.get("/:Id", getUser);

router.post("/",createUser);

router.put("/:id",updateUser);

router.delete("/:id",deleteUser);

export default router;