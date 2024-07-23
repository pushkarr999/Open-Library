import { Router } from "express";
import inputValidation from "../middleware/validation";
import {
  createBookValidation,
  getBookByIdValidation,
  getBookValidation,
  updateBookValidation,
} from "../module/books/books.validation";
import { checkToken } from "../middleware/authentication";
import {
  createBook,
  editBook,
  getBook,
  getBookByID,
} from "../module/books/books.controller";
import checkAccess from "../middleware/authorization";

const booksRouter = Router();

booksRouter.post(
  "/create",
  [checkToken(), checkAccess(), inputValidation(createBookValidation)],
  createBook
);
booksRouter.put(
  "/update",
  [checkToken(), checkAccess(), inputValidation(updateBookValidation)],
  editBook
);
booksRouter.get("/", [inputValidation(getBookValidation)], getBook);
booksRouter.get(
  "/detail/:id",
  [checkToken(), inputValidation(getBookByIdValidation)],
  getBookByID
);
export default booksRouter;
