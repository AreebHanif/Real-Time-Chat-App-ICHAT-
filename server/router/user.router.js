import express from "express";
import { userForSideBar } from "../controllers/user.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router()

router.get("/",protectRoute,userForSideBar)

export default router