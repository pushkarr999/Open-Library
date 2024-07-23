import { Router } from "express";
import inputValidation from "../middleware/validation";
import {
  registerUser,
  getUserById,
  loginUser,
  updateUser,
  createUser,
  getUsers,
  updatePassword,
} from "../module/users/users.controller";
import {
  registerUserValidation,
  loginUserValidation,
  updateUserValidation,
  createUserValidation,
  getUserValidation,
} from "../module/users/users.validation";
import { checkToken } from "../middleware/authentication";
import checkAccess from "../middleware/authorization";

const usersRoute = Router();

usersRoute.post(
  "/register",
  [inputValidation(registerUserValidation)],
  registerUser
);
usersRoute.post("/login", [inputValidation(loginUserValidation)], loginUser);
usersRoute.put(
  "/update",
  [checkToken(), inputValidation(updateUserValidation)],
  updateUser
);
usersRoute.get("/details", [checkToken()], getUserById);

//Create user for admin and librarian
usersRoute.post(
  "/create",
  [checkToken(), checkAccess(), inputValidation(registerUserValidation)],
  registerUser
);

usersRoute.get(
  "/",
  [checkToken(), checkAccess(), inputValidation(getUserValidation)],
  getUsers
);

usersRoute.put(
  "/changepassword",
  [checkToken(), inputValidation(loginUserValidation)],
  updatePassword
);

export default usersRoute;
