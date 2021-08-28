import { Router } from "express";
import bookCartController from "../controllers/bookCart";
import verifyToken from "../middlewares/verify-token"

const { addBookToCart} = bookCartController;

const router = new Router();

router.post("/books/cart", verifyToken, addBookToCart);

export default router;
