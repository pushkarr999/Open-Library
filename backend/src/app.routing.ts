import { Router } from "express";
import usersRoute from "./routes/users";
import historyRouter from "./routes/history";
import booksRouter from "./routes/books";
import paymentRouter from "./routes/payments";

const appRouter = Router();

appRouter.use("/users", usersRoute);
appRouter.use("/books", booksRouter);
appRouter.use("/history", historyRouter);
appRouter.use("/payment", paymentRouter);

export default appRouter;
