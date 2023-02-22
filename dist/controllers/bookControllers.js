"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postDeleteBook = exports.postEditBook = exports.getEditBook = exports.getBook = exports.getBooks = exports.postAddBook = exports.getAddBook = void 0;
const bookModel_1 = __importDefault(require("../models/bookModel"));
const getAddBook = (req, res, next) => {
    res.render("book/edit-book", {
        docTitle: "Add it!",
        path: "/add-book",
        editing: false,
        limit: 5,
    });
};
exports.getAddBook = getAddBook;
const postAddBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req._id);
        const newBook = yield bookModel_1.default.create(Object.assign(Object.assign({}, req.body), { datePublished: Date(), userId: req._id }));
        // res.redirect("/books?page=1&limit=5");
        res.status(201).json({
            status: "success",
            book: newBook,
        });
    }
    catch (error) {
        res.status(400).json({
            status: "fail",
            message: error,
        });
    }
});
exports.postAddBook = postAddBook;
const getBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let page = +(req.query.page || 1);
        const limit = +(req.query.limit || 100);
        const skip = (page - 1) * limit;
        let query = bookModel_1.default.find({}).sort({ createdAt: -1 });
        query = query.skip(skip).limit(limit);
        const noOfDocument = yield bookModel_1.default.countDocuments();
        let noOfPages = Math.ceil(noOfDocument / limit);
        // console.log(noOfPages);
        const nextPage = () => {
            if (page < noOfPages) {
                page++;
                return page;
            }
            else if (page >= noOfPages) {
                return 1;
            }
        };
        let x = page;
        const prevPage = () => {
            page = x;
            console.log(">>", page);
            if (page > 1) {
                page--;
                return page;
            }
            else if (page < 2) {
                return 1;
            }
        };
        if (req.query.page) {
            if (skip > noOfDocument)
                alert("Page does not exist");
        }
        const books = yield query;
        // return res.status(200).json({
        //   status: "success",
        //   result: books.length,
        //   data: {
        //     books,
        //   },
        // });
        return res.render("book/index", {
            prods: books,
            docTitle: "Library",
            path: "/books",
            limit: 5,
            nextPage: nextPage,
            prevPage: prevPage,
        });
    }
    catch (error) {
        res.status(404).json({
            status: "fail",
            message: error,
        });
    }
});
exports.getBooks = getBooks;
const getBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const book = yield bookModel_1.default.findById(id);
        res.render("book/detail", {
            book,
            docTitle: "Book Details",
        });
    }
    catch (error) {
        res.status(404).json({
            status: "fail",
            message: error,
        });
    }
});
exports.getBook = getBook;
const getEditBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const editMode = req.query.edit;
        const id = req.params.id;
        const book = yield bookModel_1.default.findById(id);
        res.render("book/edit-book", {
            docTitle: "Edit it!",
            path: "/edit-book",
            editing: editMode,
            book,
            activeAddProduct: true,
            limit: 5,
        });
    }
    catch (error) {
        res.status(404).json({
            status: "fail",
            message: error,
        });
    }
});
exports.getEditBook = getEditBook;
const postEditBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield bookModel_1.default.findByIdAndUpdate(req.body.bookID, req.body, {
            new: true,
        });
        // res.status(200).json({
        //   status: "success",
        //   data: {
        //     book,
        //   },
        // });
        res.redirect("/books?page=1&limit=5");
    }
    catch (error) {
        res.status(404).json({
            status: "fail",
            message: error,
        });
    }
});
exports.postEditBook = postEditBook;
const postDeleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bookID = req.body.bookID;
    const book = yield bookModel_1.default.findOne({ _id: bookID });
    if (!book) {
        res.status(404).json({
            message: "Book not found"
        });
    }
    yield bookModel_1.default.findByIdAndDelete(bookID);
    res.status(200).json({
        message: "Book successfully deleted"
    });
    // res.redirect("/books");
});
exports.postDeleteBook = postDeleteBook;
