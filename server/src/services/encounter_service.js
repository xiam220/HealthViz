import { Client } from "fhir-kit-client";

const client = new Client({
    baseUrl: "http://localhost:8080/fhir"
});

export async function getEncounters(){
    const bundle = await client.search({
        resourceType: "Encounter",
        searchParams: {
            _count: 100
        }
    });

    return bundle.entry?.map((e) => e.resource) || [];
}