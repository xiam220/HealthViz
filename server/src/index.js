import express from "express";
import cors from "cors";
import { testRouter } from "./routes/organization_routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/test", testRouter);

app.listen(3001, () => {
  console.log("running on 3001");
});