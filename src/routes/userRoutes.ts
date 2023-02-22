import express from "express";
import { createUser, loginUser } from "../utility/utils";
import {
  getSignIn,
  getSignOut,
  getSignUp,
  postSignIn,
  postSignUp,
} from "../controllers/userController";
import { validate } from "../middleware/validator";
const router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get("/", getSignUp);
router.post("/add-user", validate(createUser), postSignUp);
router.get("/signIn", getSignIn);
router.post("/", validate(loginUser), postSignIn);
router.get("/signOut", getSignOut);

export default router;
