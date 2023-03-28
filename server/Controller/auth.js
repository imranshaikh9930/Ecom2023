import User from "../model/user.js";
import { hashPassword, comparePassword } from "../helper/auth.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Order from "../model/Order.js";
// import Order from "../models/order.js";

dotenv.config();

export const register = async (req, res) => {
  try {
    // 1. destructure name, email, password from req.body
    const { Name, email, Password } = req.body;
    // 2. all fields require validation
    if (!Name) {
      return res.json({ error: "Name is required" });
    }
    if (!email) {
      return res.json({ error: "Email is taken" });
    }
    if (!Password || Password.length < 6) {
      return res.json({ error: "Password must be at least 6 characters long" });
    }
    // 3. check if email is taken
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ error: "Email is taken" });
    }
    // 4. hash password
    const hashedPassword = await hashPassword(Password);
    // 5. register user
    const user = await new User({
      Name,
      email,
      Password: hashedPassword,
    }).save();
    // 6. create signed jwt
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // 7. send response
    res.json({
      user: {
        Name: user.Name,
        email: user.email,
        Role: user.Role,
        address: user.address,
      },
      token,
    });
  } catch (err) {
    console.log(err);
  }
};

export const login = async (req, res) => {
  try {
    // 1. destructure name, email, password from req.body
    const { email, Password } = req.body;
    // 2. all fields require validation
    if (!email) {
      return res.json({ error: "Email is taken" });
    }
    if (!Password || Password.length < 6) {
      return res.json({ error: "Password must be at least 6 characters long" });
    }
    // 3. check if email is taken
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "User not found" });
    }
    // 4. compare password
    const match = await comparePassword(Password, user.Password);
    if (!match) {
      return res.json({ error: "Wrong password" });
    }
    // 5. create signed jwt
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // 7. send response
    res.json({
      user: {
        name: user.name,
        email: user.email,
        Role: user.Role,
        address: user.address,
      },
      token,
    });
  } catch (err) {
    console.log(err);
  }
};

export const secret = async (req, res) => {
  res.json({ currentUser: req.user });
};

export const updateProfile =async (req,res)=>{

  try{
    const {name,address,password} = req.body;
    const user  = await User.findById(req.user._id);
    // Check Password length

    if(password && password.length < 6){
      return res.json({error:"Password is required and should be min characters long  " })
    }
    // hash password 
    const hashedPassword = password ? await hashPassword(password): undefined;

    const updated = await User.findByIdAndUpdate(req.user._id,{
      name:name || req.user.Name,
      password: password || req.user.Password,
      address: address || req.user.address,
    }
    ,
    {new :true}
    )
    updated.password = undefined;
    res.json(updated);

  }catch(e){
    console.log(e);
  }
}

export const getOrders = async (req,res)=>{
  try{
    const orders = await Order.find({buyer:req.user._id})
    .populate("products","-photo")
    .populate("buyer","name");
    res.json(orders);
  }catch(err){
    console.log(err);
  }

}
 const decrementQuantity = async (cart) => {
  try {
    // build mongodb query
    const bulkOps = cart.map((item) => {
      return {
        updateOne: {
          filter: { _id: item._id },
          update: { $inc: { quantity: -1, sold: +1 } },
        },
      };
    });

    const updated = await Product.bulkWrite(bulkOps, {});
    console.log("blk updated", updated);
  } catch (err) {
    console.log(err);
  }
};

export const getAllOrders = async(req,res)=>{

  try{
  const orders = await Order.find({}).populate("products","-photo");
  res.json(orders);
  }catch(err){
    console.log(err);
  }

}