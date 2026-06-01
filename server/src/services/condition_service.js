import { Client } from "fhir-kit-client";

const client = new Client({
    baseUrl: "http://localhost:8080/fhir"
});

export async function getConditions(patientRef) {
    let bundle = await client.search({
        resourceType: "Condition",
        searchParams: {patient: patientRef, _sort: "-recorded-date"},
    });

    let active = [];
    let resolved = [];

    while (bundle) {
        for (const entry of bundle.entry || []) {
            const enc = entry.resource;

            const clinicalStatus = enc?.clinicalStatus?.coding?.[0]?.code;
            const verificationStatus = enc?.verificationStatus?.coding?.[0]?.code;

            const code = enc?.code?.coding?.[0]?.display;

            const recordedDate = enc?.recordedDate;
            const dateObj = new Date(recordedDate);
            const date = `${dateObj.getFullYear()}-${String(dateObj.getMonth()).padStart(2, "0")}-${String(dateObj.getDay()).padStart(2, "0")}`;
            const time = `${String(dateObj.getHours()).padStart(2, "0")}:${String(dateObj.getMinutes()).padStart(2, "0")}`;

            if (clinicalStatus == "active") {
                active.push({
                    clinical_status: clinicalStatus,
                    verification_status: verificationStatus,
                    condition: code,
                    recorded_date: date,
                    recorded_time: time
                });
            }

            if (clinicalStatus == "resolved") {
                resolved.push({
                    clinical_status: clinicalStatus,
                    verification_status: verificationStatus,
                    condition: code,
                    recorded_date: date,
                    recorded_time: time
                });
            }

        }

        // follow next link
        bundle = await client.nextPage({bundle}) ?? null;  
    }

    return {activeConditions: active, resolvedConditions: resolved};
}