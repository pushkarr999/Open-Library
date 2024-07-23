import mongoose, { Schema } from "mongoose";
import { BOOK_STATUS } from "../utility/constants";

const books = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number },
  status: { type: Number, enum: [Object.values(BOOK_STATUS)] },
  isbn: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  publisher: { type: String, required: true },
  published_year: { type: Number, required: true },
  genre: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image: { type: Array, default: [] },
});

export default mongoose.model("books", books);
