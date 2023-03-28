import express from "express";
import formidable from "express-formidable";
// import events from "events";
// events.EventEmitter.prototype._maxListeners = 100;
// import formidable from "express-formidable";

const router = express.Router();

// middlewares
import { requireSignin, isAdmin } from "../Middlewares/auth.js";

// Controller
import {create,list,read,photo,remove,update,filteredProduct,productCount,listProduct,productSearch,relatedProducts,productByCategory,generateToken,processPayment,orderStatus }from "../Controller/Product.js";


router.post("/product",requireSignin,isAdmin,formidable(),create);

router.get("/products",list)
//  GEt Single product read
router.get("/product/:slug",read);
//  Get Single Product image
router.get("/product/photo/:productId",photo)
// update product
router.put("/product/:productId", requireSignin, isAdmin, formidable(), update);
// Delete product
router.delete("/product/:productId", requireSignin, isAdmin, remove);

router.post("/filtered-products",filteredProduct)

router.get("/product-count",productCount);
router.get("/list-product/:page",listProduct);

router.get("/products/search/:keyword",productSearch)
router.get("/related-products/:productId/:categoryId",relatedProducts)
router.get("/products-by-category/:slug",productByCategory);

// Payment Routes
router.get("/braintree/token",generateToken);
router.post("/brainTree/payment",requireSignin,processPayment)
router.put("/order-status/:orderId",requireSignin,isAdmin,orderStatus)

export default router