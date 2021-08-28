import { Router } from "express";
import bookController from "../controllers/book";
import reviewController from "../controllers/review";
import upload from "../middlewares/photo-upload"
import verifyToken from "../middlewares/verify-token"

const { addBook, getBook, listBooks, updateBook, likeBook, featuredBook, searchBooks } = bookController;
const { reviewBook, fetchBookReview } = reviewController;

const router = new Router();

router.post("/books", upload.single("photo"), verifyToken, addBook);
router.get("/books/:id", verifyToken, getBook);
router.get("/books", verifyToken, listBooks);
router.get("/book", verifyToken, searchBooks);
router.put("/books/:id", upload.single("photo"), verifyToken, updateBook);
router.patch("/books/likes/:id", verifyToken, likeBook);
router.get("/feature/book", verifyToken, featuredBook);
router.post("/rating/:id", verifyToken, reviewBook);
router.get("/rating/:id", verifyToken, fetchBookReview);

export default router;
