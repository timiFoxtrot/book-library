"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utils_1 = require("../utility/utils");
const userController_1 = require("../controllers/userController");
const validator_1 = require("../middleware/validator");
const router = express_1.default.Router();
// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.get("/", userController_1.getSignUp);
router.post("/add-user", (0, validator_1.validate)(utils_1.createUser), userController_1.postSignUp);
router.get("/signIn", userController_1.getSignIn);
router.post("/", (0, validator_1.validate)(utils_1.loginUser), userController_1.postSignIn);
router.get("/signOut", userController_1.getSignOut);
exports.default = router;
