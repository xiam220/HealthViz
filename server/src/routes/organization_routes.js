import { Router } from "express";
import { getEncounters } from "../services/encounter_service.js";

export const testRouter = Router();

testRouter.get("/encounters", async (req, res) => {
    const encounters = await getEncounters();

    console.log("Encounters", encounters.length);

    res.json({
        count: encounters.length
    })
}
)
