import express from "express";
import cors from "cors";
// import encounter_router from "./routes/encounter_routes.js";
import { condition_router, allergyIntolerance_router , immunization_router } from "./routes/patientProfile_routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// app.use("/api/encounter", encounter_router);
app.use("/api/Condition", condition_router);
app.use("/api/AllergyIntolerance", allergyIntolerance_router);
app.use("/api/Immunization", immunization_router);

app.listen(3001, () => {
  console.log("running on 3001");
});