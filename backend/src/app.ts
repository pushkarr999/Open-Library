import express, { Express, NextFunction, Request, Response } from "express";
import dotnev from "dotenv";
import path from "path";
import cors from "cors";

import { connectDatabase } from "../src/database";
import appRouter from "./app.routing";

dotnev.config({ path: path.join(__dirname, "../.env") });

function startApp() {
  try {
    const app: Express = express();
    const port = process.env.PORT || 3002;
    connectDatabase();

    app.use((req: Request, res: Response, next: NextFunction) => {
      res.header("Access-Control-Expose-Headers", "token");
      next();
    });

    app.use(cors());
    app.use(express.json());

    app.use("/api/v1", appRouter);

    app.listen(port, () => {
      console.log("Server listening on port ", port);
    });
  } catch (error) {
    console.log("Error while starting server ", error);
  }
}

startApp();
