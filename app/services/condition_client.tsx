import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface ResourceTypeProps {
    patient_id: string;
    base_url? : URL;
}

/*
    fetch Condition resource type
    data from the backend

*/
type Condition = {
    clinical_status: string,
    verification_status: string,
    condition: string,
    recorded_date: string,
    recorded_time: string
}

type ConditionResponse = {
    activeConditions: Condition[],
    resolvedConditions: Condition[]
}

export async function condition_loader() {
    const condition = await fetch("http://localhost:3001/api/Condition");
    const condition_data = await condition.json();
    return condition_data;
}


export function LoadCondition(props: ResourceTypeProps) {
    const [conditions, setConditions] = useState<ConditionResponse>({activeConditions: [], resolvedConditions: []});

    useEffect(() => {
        async function loadData() {
            const data = await condition_loader();
            setConditions(data);
        }   
        
        loadData();
    }, []);

    return(
        <div>
            <h1> Conditions </h1>
            {
                conditions.activeConditions.map(c => (
                    <p>
                        {c.condition}
                        {c.recorded_date}
                        {c.recorded_time}
                    </p>
                ))
            }
        </div>
    );
}