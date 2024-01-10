import express, { Application, json } from "express";
import { dbConfig } from "./utils/dbConfig";
import cors from "cors";
import { mainApp } from "./mainApp";

const app: Application = express();

const port: number = parseInt(process.env.PORT!);

app.use(cors());
app.use(json());

mainApp(app);

const server = app.listen(port, () => {
  dbConfig();
});

process
  .on("uncaughtException", (error: Error) => {
    console.log(error);
    process.exit(1);
  })
  .on("unhandledRejection", (reason: any) => {
    console.log(reason);
    server.close(() => {
      process.exit(1);
    });
  });
