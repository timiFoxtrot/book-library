import express from "express";
import {
  getAddBook,
  getBook,
  getBooks,
  postAddBook,
  getEditBook,
  postEditBook,
  postDeleteBook,
} from "../controllers/bookControllers";
import { auth } from "../middleware/auth";
import { validate } from "../middleware/validator";
import { addBookValidator } from "../utility/utils";
const router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get("/", auth, getBooks);
router.get("/add-book", getAddBook);
router.get("/:id", getBook);
router.post("/add-book", validate(addBookValidator), auth, postAddBook);
router.get("/edit-book/:id", getEditBook);
router.post("/edit-book/", postEditBook);
router.post("/delete-book", postDeleteBook);

export default router;
