import { Router } from "express";
import { signupUser, signInUser, getMyProfile } from "../controllers/user.controller.ts";
import { routeRateLimitter } from "../middleware/routeLimitter.ts";
import { validate } from "../middleware/validate.ts";
import {registerUserSchema, signinUserSchema} from "../validators/user.validator.ts";
import { authenticate } from "../middleware/authenticate.ts";


const router = Router();

router.post("/register", validate(registerUserSchema),signupUser);
router.post("/login", routeRateLimitter({windowsec: 10*1000, maxRequests: 3}), validate(signinUserSchema), signInUser)
router.get("/me", authenticate, getMyProfile);


export default router;