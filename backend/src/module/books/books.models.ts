import { Types } from "mongoose";
import books from "../../models/books";
import { IBookCreate } from "./books.interface";
import users from "../../models/users";

const createBookDB = async (furniture_data: IBookCreate) => {
  try {
    return await books.create(furniture_data);
  } catch (error) {
    throw error;
  }
};

const getBookByIDDB = async (book_id: string) => {
  try {
    return await books.findById(book_id);
  } catch (error) {
    throw error;
  }
};

const getBookDB = async (
  query: Record<
    string,
    | Array<Record<string, number | string | any>>
    | number
    | string
    | Record<string, number | string>
  >,
  limit: number,
  skip: number
) => {
  try {
    return await books.find(query).skip(skip).limit(limit);
  } catch (error) {
    throw error;
  }
};

const updateBookDB = async (
  query: { _id: Types.ObjectId },
  update_data: { [key: string]: string | number | Array<string> },
  options: { new?: boolean } = {}
) => {
  try {
    return await books.findOneAndUpdate(query, update_data, options);
  } catch (error) {
    throw error;
  }
};

const getBookCount = async (
  query: Record<
    string,
    | Array<Record<string, number | string | any>>
    | number
    | string
    | Record<string, number | string>
  >
) => {
  try {
    return books.countDocuments(query);
  } catch (error) {
    throw error;
  }
};

export { createBookDB, getBookByIDDB, updateBookDB, getBookDB, getBookCount };
