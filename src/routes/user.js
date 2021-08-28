import { Router } from "express";
import userController from "../controllers/user";
import Validation  from '../validation/user'

const { registerUsers, login } = userController;
const { validateSignupDetails, validatePassword, validateLoginDetails } = Validation;

const router = new Router();

router.post("/register", validateSignupDetails, registerUsers);
router.post("/login", validatePassword, validateLoginDetails, login);

export default router;
