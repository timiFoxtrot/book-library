import mongoose, { Model, Schema, HydratedDocument, model } from "mongoose";

export interface BookInput {
  Title: string;
  Author: string;
  datePublished: string;
  Description: string;
  pageCount: number;
  Genre: string;
  Publisher: string;
  userId: string;
}

const bookSchema = new mongoose.Schema<BookInput>(
  {
    Title: { type: String, required: true },
    Author: { type: String, required: true },
    datePublished: { type: String },
    Description: { type: String, required: true },
    pageCount: { type: Number, required: true },
    Genre: { type: String, required: true },
    Publisher: { type: String, required: true },
    userId: { type: String },
  },
  {
    timestamps: true,
  }
);

const Book = model<BookInput>("Book", bookSchema);

export default Book;
