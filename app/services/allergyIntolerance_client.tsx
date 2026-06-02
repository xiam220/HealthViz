import { useEffect, useState } from "react";

interface ResourceTypeProps {
    patient_id: string;
}

/*
    fetch AllergyIntolerance resource type
    data from the backend

*/

type AllergyIntolerance = {
    clinical_status: string,
    verification_status: string,
    type: string,
    category: string,
    criticality: string,
    substance: string,
    reactions: string,
    recorded_date: string,
    recorded_time: string
}

type AllergyIntoleranceResponse = {
    activeAllergyIntolerance: AllergyIntolerance[],
    inactiveAllergyIntolerance: AllergyIntolerance[],
    resolvedAllergyIntolerance: AllergyIntolerance[]
}

export async function allergyIntolerance_loader() {
    const allergyIntolerance = await fetch("http://localhost:3001/api/AllergyIntolerance");
    const allergyIntolerance_data = await allergyIntolerance.json();
    return allergyIntolerance_data;
}


export function LoadAllergyIntoleranceRecords(props: ResourceTypeProps) {
    const [allergyIntoleranceRecords, setAllergyIntoleranceRecords] = useState<AllergyIntoleranceResponse>({activeAllergyIntolerance: [], inactiveAllergyIntolerance: [], resolvedAllergyIntolerance: []});

    useEffect(() => {
        async function loadData() {
            const data = await allergyIntolerance_loader();
            setAllergyIntoleranceRecords(data);
        }   
        
        loadData();
    }, []);

    return(
        <div>
            <h1> Allergies & Intolerances </h1>
            {
                allergyIntoleranceRecords.activeAllergyIntolerance.map(r => (
                    <p>
                        {r.verification_status}&ensp;
                        {r.type}&ensp;
                        {r.category}&ensp;
                        {r.criticality}&ensp;
                        {r.substance}&ensp;
                        {r.reactions}&ensp;
                        {r.recorded_date}&ensp;
                        {r.recorded_time}
                    </p>
                ))
            }
        </div>
    );
}