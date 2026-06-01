import { Client } from "fhir-kit-client";

const client = new Client({
    baseUrl: "http://localhost:8080/fhir"
});

export async function getAllergyIntolerance(patientRef) {
    let bundle = await client.search({
        resourceType: "AllergyIntolerance",
        searchParams: {patient: patientRef, _sort: "criticality"},
    });

    // active: currently experiencing or is at risk of a reaction 
    // inactive: no longer a risk of a reaction to the substance
    // resolved: a reaction to the substance has been reassessed and is no longer considered to be present
    let active = [];
    let inactive = [];
    let resolved = [];

    while (bundle) {
        for (const entry of bundle.entry || []) {
            const enc = entry.resource;

            const clinicalStatus = enc?.clinicalStatus?.coding?.[0]?.code;
            const verificationStatus = enc?.verificationStatus?.coding?.[0]?.code;
        

            const type = enc?.type;
            const category = enc?.category?.[0];
            const criticality = enc?.criticality;
            const code = enc?.code?.coding?.[0]?.display;

            const recordedDate = enc?.recordedDate;
            const dateObj = new Date(recordedDate);
            const date = `${dateObj.getFullYear()}-${String(dateObj.getMonth()).padStart(2, "0")}-${String(dateObj.getDay()).padStart(2, "0")}`;
            const time = `${String(dateObj.getHours()).padStart(2, "0")}:${String(dateObj.getMinutes()).padStart(2, "0")}`;

            const reaction = enc?.reaction;
            let manifestion = [];
            if (reaction) {
                manifestion = reaction.map(r => r.manifestation?.[0]?.coding?.[0]?.display);
            }


            if (clinicalStatus == "active") {
                active.push({
                    clinical_status: clinicalStatus,
                    verification_status: verificationStatus,
                    type: type,
                    category: category,
                    criticality: criticality,
                    substance: code,
                    reactions: manifestion,
                    recorded_date: date,
                    recorded_time: time
                });
            }

            if (clinicalStatus == "inactive") {
                active.push({
                    clinical_status: clinicalStatus,
                    verification_status: verificationStatus,
                    type: type,
                    category: category,
                    criticality: criticality,
                    substance: code,
                    reactions: manifestion,
                    recorded_date: date,
                    recorded_time: time
                });
            }

            if (clinicalStatus == "resolved") {
                resolved.push({
                    clinical_status: clinicalStatus,
                    verification_status: verificationStatus,
                    type: type,
                    category: category,
                    criticality: criticality,
                    substance: code,
                    reactions: manifestion,
                    recorded_date: date,
                    recorded_time: time
                });
            }

        }

        // follow next link
        bundle = await client.nextPage({bundle}) ?? null;  
    }

    return {activeAllergyIntolerance: active, inactiveAllergyIntolerance: inactive, resolvedAllergyIntolerance: resolved};
}