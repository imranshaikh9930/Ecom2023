import express from "express";

const router = express.Router();

// middlewares
import { requireSignin, isAdmin } from "../Middlewares/auth.js";
// controllers
import {
  register,
  login,
  secret,
  updateProfile,
  getOrders,
  getAllOrders,
} from "../Controller/auth.js";
router.post("/register", register);
router.post("/login", login);

router.get("/auth-check",requireSignin,(req,res)=>{
  res.json({ok:true});
})
router.get("/admin-check",requireSignin,isAdmin,(req,res)=>{
  res.json({ok:true});
})


// testing
router.get("/secret", requireSignin, isAdmin, secret);

router.put("/profile",requireSignin,updateProfile);

//orders
router.get("/orders",requireSignin,getOrders)
router.get("/all-orders",requireSignin,isAdmin,getAllOrders);
export default router;