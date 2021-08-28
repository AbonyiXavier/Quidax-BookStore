import { Router } from "express";
import userRoute from "./user";
import bookRoute from "./book";
import bookCartRoute from "./bookCart";

const router = new Router();

router.use("/v1", userRoute);
router.use("/v1", bookRoute);
router.use("/v1", bookCartRoute);

export default router;
