import { Router } from "express";
import { getConditions } from "../services/condition_service.js";
import { getAllergyIntolerance } from "../services/allergyIntolerance_services.js";
import { getImmunization } from "../services/immunization_services.js";

export const condition_router = Router();
export const allergyIntolerance_router = Router();
export const immunization_router = Router();

condition_router.get("/", async (req, res) => {
    const condition = await getConditions(2153);
    res.json(condition);
});


allergyIntolerance_router.get("/", async(req, res) => {
    const allergyIntolerance = await getAllergyIntolerance(5879);
    res.json(allergyIntolerance);
});


immunization_router.get("/", async(req, res) => {
    const immunization = await getImmunization(2153);
    res.json(immunization);
});

// export default {
//     condition_router,
//     allergyIntolerance_router,
//     immunization_router
// }
