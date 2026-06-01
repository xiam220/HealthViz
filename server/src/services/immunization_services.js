import { Client } from "fhir-kit-client";

const client = new Client({
    baseUrl: "http://localhost:8080/fhir"
});

export async function getImmunization(patientRef) {
    let bundle = await client.search({
        resourceType: "Immunization",
        searchParams: {patient: patientRef},
    });

    let completed = [];
    let not_done= [];
    let error = [];
    

    while (bundle) {
        for (const entry of bundle.entry || []) {
            const enc = entry.resource;

            const status = enc?.status;
            const statusReason = enc?.statusReason;
            const vaccine = enc?.vaccineCode.coding?.[0]?.display;
            
            const occurrenceDateTime = enc?.occurrenceDateTime;
            const dateObj = new Date(occurrenceDateTime);
            const date = `${dateObj.getFullYear()}-${String(dateObj.getMonth()).padStart(2, "0")}-${String(dateObj.getDay()).padStart(2, "0")}`;
            const time = `${String(dateObj.getHours()).padStart(2, "0")}:${String(dateObj.getMinutes()).padStart(2, "0")}`;


            if (status == "completed") {
                completed.push({
                    vaccination_status: status,
                    status_reason: statusReason,
                    vaccine: vaccine,
                    administration_date: date,
                    administration_time: time
                });
            }

            if (status == "not-done") {
                not_done.push({
                   vaccination_status: status,
                    status_reason: statusReason,
                    vaccine: vaccine,
                    administration_date: date,
                    administration_time: time
                });
            }

            if (status == "error") {
                error.push({
                   vaccination_status: status,
                    status_reason: statusReason,
                    vaccine: vaccine,
                    administration_date: date,
                    administration_time: time
                });
            }

        }

        // follow next link
        bundle = await client.nextPage({bundle}) ?? null;  
    }

    return {completed: completed, not_done: not_done, entered_in_error: error};
}