import { Router } from "express";
import { signupUser, signInUser, getMyProfile } from "../controllers/user.controller";
import { routeRateLimitter } from "../middleware/routeLimitter";
import { validate } from "../middleware/validate";
import {registerUserSchema, signinUserSchema} from "../validators/user.validator";
import { authenticate } from "../middleware/authenticate";


const router = Router();

router.post("/register", validate(registerUserSchema),signupUser);
router.post("/login", routeRateLimitter({windowsec: 10*1000, maxRequests: 3}), validate(signinUserSchema), signInUser)
router.get("/me", authenticate, getMyProfile);


export default router;