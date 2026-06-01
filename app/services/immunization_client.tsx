import { useEffect, useState } from "react";

interface ResourceTypeProps {
    patient_id: string;
}

/*
    fetch Immunization resource type
    data from the backend

*/

type Immunization = {
    status: string,
    status_reason: string,
    vaccine: string,
    administration_date: string,
    administration_time: string
}

type ImmunizationResponse = {
    completed: Immunization[],
    not_done: Immunization[],
    entered_in_error: Immunization[]
}

export async function immunization_loader() {
    const immunization = await fetch("http://localhost:3001/api/Immunization");
    const immunization_data = await immunization.json();
    return immunization_data;
}


export function LoadImmunizationRecords(props: ResourceTypeProps) {
    const [immunizationRecords, setImmunizationRecords] = useState<ImmunizationResponse>({completed: [], not_done: [], entered_in_error: []});

    useEffect(() => {
        async function loadData() {
            const data = await immunization_loader();
            setImmunizationRecords(data);
        }   
        
        loadData();
    }, []);

    return(
        <div>
            <h1> Immunization History </h1>
            {
                immunizationRecords.completed.map(r => (
                    <p>
                        {r.vaccine}&ensp;
                        {r.administration_date}&ensp;
                        {r.administration_time}&ensp;
                    </p>
                ))
            }
        </div>
    );
}