import express from "express";
import cors from "cors";
import { classificationRouter, datesRouter, testRouter, totalPatients, totalEncounters } from "./routes/organization_routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/test", testRouter);
app.use("/", datesRouter);
app.use("/", classificationRouter);
app.use("/", totalPatients);
app.use("/", totalEncounters);

app.listen(3001, () => {
  console.log("running on 3001");
});