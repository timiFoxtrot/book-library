import express, { Application, Request, Response, NextFunction } from "express";
import Book from "../models/bookModel";
import { addBookValidator } from "../utility/utils";

export const getAddBook = (req: Request, res: Response, next: NextFunction) => {
  res.render("book/edit-book", {
    docTitle: "Add it!",
    path: "/add-book",
    editing: false,
    limit: 5,
  });
};

export const postAddBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req._id);
    const newBook = await Book.create({
      ...req.body,
      datePublished: Date(),
      userId: req._id,
    });
    // res.redirect("/books?page=1&limit=5");

    res.status(201).json({
      status: "success",
      book: newBook,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

export const getBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let page: number = +(req.query.page || 1);
    const limit: number = +(req.query.limit || 100);
    const skip = (page - 1) * limit;
    let query = Book.find({}).sort({ createdAt: -1 });
    query = query.skip(skip).limit(limit);

    const noOfDocument = await Book.countDocuments();

    let noOfPages = Math.ceil(noOfDocument / limit);

    const nextPage = () => {
      if (page < noOfPages) {
        page++;
        return page;
      } else if (page >= noOfPages) {
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
      } else if (page < 2) {
        return 1;
      }
    };

    if (req.query.page) {
      if (skip > noOfDocument) alert("Page does not exist");
    }

    const books = await query;
    
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
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

export const getBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const book = await Book.findById(id);

    res.render("book/detail", {
      book,
      docTitle: "Book Details",
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

export const getEditBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const editMode = req.query.edit;
    const id = req.params.id;
    const book = await Book.findById(id);
    res.render("book/edit-book", {
      docTitle: "Edit it!",
      path: "/edit-book",
      editing: editMode,
      book,
      activeAddProduct: true,
      limit: 5,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

export const postEditBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const book = await Book.findByIdAndUpdate(req.body.bookID, req.body, {
      new: true,
    });
    // res.status(200).json({
    //   status: "success",
    //   data: {
    //     book,
    //   },
    // });
    res.redirect("/books?page=1&limit=5");
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

export const postDeleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bookID = req.body.bookID;
  const book = await Book.findOne({_id: bookID})
  if(!book) {
    res.status(404).json({
      message: "Book not found"
    })
  }
  await Book.findByIdAndDelete(bookID);
  res.status(200).json({
    message: "Book successfully deleted"
  })
  // res.redirect("/books");
};
