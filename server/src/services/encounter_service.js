import { Client } from "fhir-kit-client";

const client = new Client({
    baseUrl: "http://localhost:8080/fhir"
});

// module.exports = {getAllEncounters};

export async function getAllEncounters() {
    let bundle = await client.search({
        resourceType: "Encounter"
    });

    let rows = [];

    while (bundle) {
        for (const entry of bundle.entry || []) {
            const enc = entry.resource;

            const orgRef = enc?.serviceProvider?.reference;
            const orgId = orgRef?.split("/")[1];

            const locRef = enc?.location?.[0]?.location?.reference;
            const locId = locRef?.split("/")[1];

            const patientRef = enc?.subject?.reference;
            const classification = enc?.class?.code;
            const type = enc?.type?.coding?.code;
            
            const start = enc?.period?.start;
            const date_obj = new Date(start);
            const monthYear = `${date_obj.getFullYear()}-${String(date_obj.getMonth()).padStart(2, "0")}`;

            rows.push({
                org_id: orgId,
                location_id: locId,
                encounter_id: enc.id,
                patient_id: patientRef,
                class_code: classification,
                type_code: type,
                date: monthYear
            });
        }

        // follow next link
        bundle = await client.nextPage({bundle}) ?? null;  
    }

    return rows;
}


export async function getEncountersByOrg(orgId) {
    const encounters = await getEncounters();

    return encounters.filter(
        (e) => 
            e.serviceProvider?.reference === `Organization/${orgId}`
    );
}

export async function getEncounters(){
    const bundle = await client.search({
        resourceType: "Encounter",
        searchParams: {
            _count: 1000
        }
    });

    return bundle.entry?.map((e) => e.resource) || [];
}