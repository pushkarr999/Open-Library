import { NextFunction, Response } from "express";
import { CustomRequest } from "../utility/interface";
import { NOT_ALLOWED } from "../utility/httpcode";
import { ROLE } from "../utility/constants";

function checkAccess() {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const decoded_token = req.decoded_token;
      console.log("Decoded token ", decoded_token);
      console.log("Index of users ", req.originalUrl.indexOf("users/create"));
      if (decoded_token?.role != undefined) {
        if (
          decoded_token?.role === ROLE["ADMIN"] &&
          req.originalUrl.indexOf("users/create") != -1
        ) {
          const body_data = req.body;
          if ([ROLE.ADMIN, ROLE.LIBRARIAN].includes(body_data.role)) {
            next();
          } else {
            return res.status(NOT_ALLOWED).json({
              status: "error",
              message: "User does not have sufficent access",
            });
          }
        } else if (
          decoded_token?.role === ROLE["USERS"] &&
          (req.originalUrl.indexOf("history/create") != -1 ||
            req.originalUrl.indexOf("history/update") != -1)
        ) {
          next();
        } else if (
          decoded_token.role === ROLE.ADMIN ||
          decoded_token.role === ROLE.LIBRARIAN
        ) {
          next();
        } else {
          return res.status(NOT_ALLOWED).json({
            status: "error",
            message: "User does not have sufficent access",
          });
        }
      } else {
        return res.status(NOT_ALLOWED).json({
          status: "error",
          message: "User does not have sufficent access",
        });
      }
    } catch (error) {
      res.status(NOT_ALLOWED).json({
        status: "error",
        message: "Some error occured while checking access",
      });
    }
  };
}

export default checkAccess;
