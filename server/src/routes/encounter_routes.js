import { Router } from "express";
import { getAllEncounters } from "../services/encounter_service.js";
import { Parser } from "@json2csv/plainjs";

const router = Router();

router.get("/", async (req, res) => {
    const data = await getAllEncounters();
    res.json(data);
});

router.get("/csv", async (req, res) => {
    const data = await getAllEncounters();

    const parser = new Parser();
    const csv = parser.parse(data);

    res.header("Content-Type", "text/csv");
    res.attachment("encounters.csv");
    res.send(csv);
});

export default router;

