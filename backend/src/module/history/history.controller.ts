import { Response } from "express";
import {
  BAD_REQUEST,
  CREATED,
  NOT_ALLOWED,
  NOT_FOUND,
  SUCCESSFUL,
} from "../../utility/httpcode";
import { CustomRequest } from "../../utility/interface";
import {
  createHistoryDB,
  getHistoryByQuery,
  getHistoryCount,
  getHistoryDB,
} from "./history.model";
import { getBookByIDDB, updateBookDB } from "../books/books.models";
import { HISTORY_TYPE, OVERDUE_PRICE } from "../../utility/constants";
import { getDays } from "../../utility/helper";

async function createHistory(req: CustomRequest, res: Response) {
  try {
    const body = req.body;
    const token = req.decoded_token;
    const time = body.time;
    if (!body && Object.keys(body).length === 0)
      return res
        .status(BAD_REQUEST)
        .json({ status: "error", message: "Invalid request" });
    if (!token || !token._id)
      return res
        .status(BAD_REQUEST)
        .json({ status: "error", message: "User ID not found" });
    if (!body.book_id)
      return res
        .status(BAD_REQUEST)
        .json({ status: "error", message: "Bood ID not found" });
    if (
      body.type == HISTORY_TYPE.BORROWER &&
      time < Math.round(Date.now() / 1000)
    )
      return res.status(BAD_REQUEST).json({
        status: "error",
        message: "Time must be greater than current time",
      });
    const create_data = {
      users_id: token._id as string,
      books_id: body.book_id as string,
      type: parseInt(body.type as string),
      time: time || Math.round(Date.now()),
    };
    let book_data = JSON.parse(
      JSON.stringify(await getBookByIDDB(body.book_id))
    );
    if (book_data) {
      if (book_data.quantity != 0 && body.type === HISTORY_TYPE.BORROWER) {
        const created_data = await createHistoryDB(create_data);
        book_data = { ...book_data, quantity: book_data.quantity - 1 };
        const updated_book_data = await updateBookDB(
          { _id: body.book_id },
          { $set: book_data },
          { new: true }
        );
        console.log("Updated book data ", updated_book_data);
        res.status(CREATED).json({
          status: "success",
          message: "Successfully created history",
          result: created_data,
        });
      } else if (body.type === HISTORY_TYPE.RETURNED) {
        console.log("Query ", {
          users_id: create_data.users_id,
          books_id: create_data.books_id,
          type: HISTORY_TYPE.BORROWER,
        });
        const get_borrowed_book = JSON.parse(
          JSON.stringify(
            await getHistoryByQuery(
              {
                users_id: create_data.users_id,
                books_id: create_data.books_id,
                type: HISTORY_TYPE.BORROWER,
              },
              { time: -1 }
            )
          )
        );
        console.log("Get borrowed book ", get_borrowed_book);
        if (get_borrowed_book && get_borrowed_book.length != 0) {
          const book = get_borrowed_book[0];
          if (Math.round(Date.now() / 1000) > book.time) {
            const overdue_amt = getDays(book.time) * OVERDUE_PRICE;
            return res.status(BAD_REQUEST).json({
              status: "error",
              message: "Over Due payment required",
              result: overdue_amt,
            });
          }
          const created_data = await createHistoryDB(create_data);
          book_data = { ...book_data, quantity: book_data.quantity + 1 };
          const updated_book_data = await updateBookDB(
            { _id: body.book_id },
            { $set: book_data },
            { new: true }
          );
          console.log("Updated book data ", updated_book_data);
          res.status(CREATED).json({
            status: "success",
            message: "Successfully created history",
            result: created_data,
          });
        } else {
          return res
            .status(BAD_REQUEST)
            .json({ status: "error", message: "Book cannot returned" });
        }
      } else {
        res
          .status(BAD_REQUEST)
          .json({ status: "error", message: "Some error occured" });
      }
    } else {
      return res
        .status(NOT_FOUND)
        .json({ status: "error", message: "Book not found" });
    }
  } catch (error: any) {
    return res
      .status(BAD_REQUEST)
      .json({ status: "error", message: error.message });
  }
}

// async function updateHistory(req: CustomRequest, res: Response) {
//   try {
//     const body = req.body;
//     const params = req.params;
//     const history_id = params.id
//     const type = body.type;
//     const book_id = body.book_id;
//     const token = req.decoded_token;
//     if (!body && Object.keys(body).length === 0)
//       return res
//         .status(BAD_REQUEST)
//         .json({ status: "error", message: "Invalid request" });
//     if (!token || !token._id)
//       return res
//         .status(BAD_REQUEST)
//         .json({ status: "error", message: "User ID not found" });
//     if (!book_id)
//       return res
//         .status(BAD_REQUEST)
//         .json({ status: "error", message: "Bood ID not found" });

//     const history_data = JSON.parse(JSON.stringify(await getHistoryById(history_id)))
//     if(history_data){
//       const
//     }else{
//       res.status(NOT_FOUND).json({status: "error", message: "No data found for requested ID"})
//     }
//   } catch (error: any) {
//     console.log("Update history");
//     console.log(error);
//     res.status(BAD_REQUEST).json({ status: "error", message: error.message });
//   }
// }

async function getHistory(req: CustomRequest, res: Response) {
  try {
    const body = req.body;
    if (!body && Object.keys(body).length)
      return res
        .status(BAD_REQUEST)
        .json({ status: "error", message: "Invalid Request" });
    const type = body.type;
    const users_id = body.users_id;
    const book_id = body.book_id;
    const limit = body.limit || 50;
    let skip = body.skip || 0;
    const query: { [key: string]: string | number } = {};

    query["users_id"] = req.decoded_token?._id;
    if (type != undefined) query["type"] = type;
    if (book_id != undefined) query["book_id"] = book_id;
    skip = skip * limit;
    const get_history_count = await getHistoryCount(query);
    let get_history_data;
    if (type === HISTORY_TYPE.BORROWER) {
      get_history_data = JSON.parse(
        JSON.stringify(await getHistoryDB(query, limit, skip))
      );
      let final_data: Array<any> = [];
      for (let hd of get_history_data) {
        const returned_book = JSON.parse(
          JSON.stringify(
            await getHistoryByQuery({
              users_id: hd.users_id._id,
              books_id: hd.books_id._id,
              type: HISTORY_TYPE.RETURNED,
            })
          )
        );
        if (returned_book.length == 0) {
          hd.overdue_amt = getDays(hd.time) * OVERDUE_PRICE;
          final_data.push(hd);
        }
      }
      get_history_data = final_data;
    } else if (type === HISTORY_TYPE.RETURNED) {
      get_history_data = await getHistoryDB(query, limit, skip);
    }
    //need to comment

    if (get_history_data && get_history_count !== 0) {
      res.status(SUCCESSFUL).json({
        status: "success",
        message: "Data fetched successfully",
        result: { data: get_history_data, count: get_history_count },
      });
    } else {
      res.status(NOT_FOUND).json({ status: "error", message: "No Data found" });
    }
  } catch (error: any) {
    res.status(BAD_REQUEST).json({ status: "error", message: error.message });
  }
}

export { createHistory, getHistory };
