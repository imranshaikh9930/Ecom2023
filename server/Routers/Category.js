import express from "express";

const router = express.Router();

// Middlewares
import {requireSignin,isAdmin} from "../Middlewares/auth.js"
import { create,update,remove,list,read } from "../Controller/Category.js";

router.post("/category",requireSignin,isAdmin,create);
// Update Category Routes
router.put("/category/:categoryId",requireSignin,isAdmin,update)
// Remove Category Routes
router.delete("/category/:categoryId",requireSignin,isAdmin,remove);
// Read All  Category Routes
router.get("/category",list);
// Read Single Category Routes;

router.get("/category/;categoryId",read)






export default router;