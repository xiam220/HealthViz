import { Router } from "express";
import { getEncounters, getEncountersByOrg } from "../services/encounter_service.js";

export const testRouter = Router();

testRouter.get("/org/:id/dashboard", async (req, res) => {
    const encounters = await getEncountersByOrg(req.params.id);
    const patients = new Set(
        encounters.map((e) => e.subject?.reference)
    );

    // Count vists by classification
    const encounter_types = {};
    const encounter_date = {};
    encounters.forEach((e) => {
        const code = e.class?.code || "UNKNOWN";
        encounter_types[code] = (encounter_types[code] || 0) + 1;
        
        const start = e.period?.start;
        const date = new Date(start);
        console.log(date);
        const monthYear = `${date.getFullYear()}-${String(date.getMonth()).padStart(2, "0")}`;
        encounter_date[monthYear] = (encounter_date[monthYear] || 0) + 1;
    })


    res.json({
        organizationId: req.params.id,
        stats: {
            totalEncounters: encounters.length,
            totalPatients: patients.size
        },
        visitClassification: encounter_types,
        date: encounter_date
    });
});
