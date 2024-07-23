import { Router } from "express";
import { checkToken } from "../middleware/authentication";
import inputValidation from "../middleware/validation";
import {
  createHistoryValidation,
  getHistoryValidation,
  updateHistoryValidation,
} from "../module/history/history.validation";
import {
  createHistory,
  getHistory,
} from "../module/history/history.controller";
import checkAccess from "../middleware/authorization";

const historyRouter = Router();

historyRouter.post(
  "/create",
  [checkToken(), checkAccess(), inputValidation(createHistoryValidation)],
  createHistory
);

historyRouter.post(
  "/",
  [checkToken(), inputValidation(getHistoryValidation)],
  getHistory
);

export default historyRouter;
