"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookControllers_1 = require("../controllers/bookControllers");
const auth_1 = require("../middleware/auth");
const validator_1 = require("../middleware/validator");
const utils_1 = require("../utility/utils");
const router = express_1.default.Router();
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get("/", auth_1.auth, bookControllers_1.getBooks);
router.get("/add-book", bookControllers_1.getAddBook);
router.get("/:id", bookControllers_1.getBook);
router.post("/add-book", (0, validator_1.validate)(utils_1.addBookValidator), auth_1.auth, bookControllers_1.postAddBook);
router.get("/edit-book/:id", bookControllers_1.getEditBook);
router.post("/edit-book/", bookControllers_1.postEditBook);
router.post("/delete-book", bookControllers_1.postDeleteBook);
exports.default = router;
