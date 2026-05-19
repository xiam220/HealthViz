import { Router } from "express";
import { getEncounters, getEncountersByOrg } from "../services/encounter_service.js";

export const totalEncounters = Router();
export const totalPatients = Router();
export const datesRouter = Router();
export const classificationRouter = Router();
export const testRouter = Router();


totalEncounters.get("/org/:id/totalEncounters.csv", async (req, res) => {
    const encounters = await getEncountersByOrg(req.params.id);

    res.header("Content-Type", "text/csv");
    res.attachment("totalEncounters.csv");

    const header = "totalEncounters\n";

    res.send(header + encounters.length);
});


totalPatients.get("/org/:id/totalPatients.csv", async (req, res) => {
    const encounters = await getEncountersByOrg(req.params.id);
    const patients = new Set(
        encounters.map((e) => e.subject?.reference)
    );

    res.header("Content-Type", "text/csv");
    res.attachment("totalPatients.csv");

    const header = "totalPatients\n";

    res.send(header + patients.size);
});


classificationRouter.get("/org/:id/encountersByClassification.csv", async (req, res) => {
    const encounters = await getEncountersByOrg(req.params.id);

    const encountersByClassification = {};
    encounters.forEach((e) => {
        const code = e.class?.code || "UNKNOWN";
        encountersByClassification[code] = (encountersByClassification[code] || 0) + 1;
    })

    const rows = Object.entries(encountersByClassification).map(
        ([classification, num_encounters]) => ({classification, num_encounters})
    );

    res.header("Content-Type", "text/csv");
    res.attachment("encountersByClassification.csv");

    const header = "classification, numEncounters\n";
    const body = rows.map(r => `${r.classification},${r.num_encounters}`).join("\n");

    res.send(header + body);
});


datesRouter.get("/org/:id/encountersByDate.csv", async (req, res) => {
    const encounters = await getEncountersByOrg(req.params.id);

    const encountersByDate = {};
    encounters.forEach((e) => {
        const start = e.period?.start;
        const date_obj = new Date(start);

        const monthYear = `${date_obj.getFullYear()}-${String(date_obj.getMonth()).padStart(2, "0")}`;
        encountersByDate[monthYear] = (encountersByDate[monthYear] || 0) + 1;
    });

    const rows = Object.entries(encountersByDate).map(
        ([date, num_encounters]) => ({date, num_encounters})
    );

    res.header("Content-Type", "text/csv");
    res.attachment("encountersByDate.csv");

    const header = "date, numEncounters\n";
    const body = rows.map(r => `${r.date},${r.num_encounters}`).join("\n");

    res.send(header + body);
});


testRouter.get("/org/:id/dashboard", async (req, res) => {
    const encounters = await getEncountersByOrg(req.params.id);
    const patients = new Set(
        encounters.map((e) => e.subject?.reference)
    );

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
