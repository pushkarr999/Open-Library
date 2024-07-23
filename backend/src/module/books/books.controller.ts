import { Response } from "express";
import { CustomRequest } from "../../utility/interface";
import {
  createBookDB,
  getBookByIDDB,
  getBookCount,
  getBookDB,
  updateBookDB,
} from "./books.models";
import {
  BAD_REQUEST,
  CREATED,
  NO_CONTENT,
  NOT_FOUND,
  SUCCESSFUL,
} from "../../utility/httpcode";
import { Types } from "mongoose";

async function createBook(req: CustomRequest, res: Response) {
  try {
    const body = req.body;
    const token = req.decoded_token;
    console.log("Token added ", token);
    const create_book_data = { ...body };
    const created_book_data = await createBookDB(create_book_data);
    console.log(created_book_data);
    res.status(CREATED).json({
      status: "success",
      message: "Book created successfully",
      result: created_book_data,
    });
  } catch (error: any) {
    res.status(BAD_REQUEST).json({ status: "error", message: error.message });
  }
}

async function editBook(req: CustomRequest, res: Response) {
  try {
    const body = req.body;
    const query = req.query;
    const token = req.decoded_token;
    if (Object.keys(body).length === 0)
      return res
        .status(BAD_REQUEST)
        .json({ status: "error", message: "No Changes to Save" });
    if (Object.keys(query).length !== 0 && !!query.id) {
      const book_data = JSON.parse(
        JSON.stringify(await getBookByIDDB(query.id as string))
      );
      if (!!book_data) {
        const update_book_data = { $set: { ...book_data, ...body } };
        const updated_book_data = await updateBookDB(
          { _id: new Types.ObjectId(query.id as string) },
          update_book_data,
          { new: true }
        );
        console.log("Updated Book data ", updated_book_data);
        res.status(SUCCESSFUL).json({
          status: "success",
          message: "Updated book successfully",
          result: updated_book_data,
        });
      } else {
        return res.status(NOT_FOUND).json({
          status: "error",
          message: "Book for request ID not found",
        });
      }
    } else {
      res.status(BAD_REQUEST).json({
        status: "error",
        message: "Book ID not found in request query",
      });
    }
  } catch (error: any) {
    return res
      .status(BAD_REQUEST)
      .json({ status: "error", message: error.message });
  }
}

async function getBook(req: CustomRequest, res: Response) {
  try {
    const body = req.query;
    const searchText = body.text;
    const limit = parseInt(body.limit as string) || 50;
    let skip = parseInt(body.skip as string) || 0;
    const query: Record<
      string,
      | Array<Record<string, number | string | any>>
      | number
      | string
      | Record<string, number | string>
    > = {};
    skip = skip * limit;
    if (!!searchText) {
      query["$or"] = [
        { title: { $regex: searchText as string, $options: "i" } },
        { author: { $regex: searchText as string, $options: "i" } },
      ];
    }
    console.log("Query data ", query);
    const book_data = await getBookDB(query, limit, skip);
    const book_count = await getBookCount(query);
    if (book_data.length !== 0) {
      return res.status(SUCCESSFUL).json({
        status: "success",
        message: "Successfully fetched book data",
        result: { data: book_data, count: book_count },
      });
    } else {
      return res
        .status(NOT_FOUND)
        .json({ status: "error", message: "No Book data found" });
    }
  } catch (error: any) {
    return res
      .status(BAD_REQUEST)
      .json({ status: "error", message: error.message });
  }
}

async function getBookByID(req: CustomRequest, res: Response) {
  try {
    const params = req.params;
    if (!params || Object.keys(params).length === 0)
      return res
        .status(BAD_REQUEST)
        .json({ status: "error", message: "Book ID required" });
    const book_data = await getBookByIDDB(params.id);
    if (!book_data) {
      return res
        .status(NOT_FOUND)
        .json({ status: "error", message: "Request ID book not found" });
    } else {
      return res.status(SUCCESSFUL).json({
        status: "success",
        message: "Successfully fetched book data",
        result: book_data,
      });
    }
  } catch (error: any) {
    res.status(BAD_REQUEST).json({ status: "error", message: error.message });
  }
}

export { createBook, editBook, getBook, getBookByID };
