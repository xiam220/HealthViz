import { useQuery } from "@tanstack/react-query";

interface ResourceTypeProps {
    patient_id: string;
    base_url? : URL;
}


export default function PatientHistory(props: ResourceTypeProps) {
    const url = new URL("http://localhost:8080/fhir");

    return(
        <Condition patient_id={props.patient_id} base_url={props.base_url}/> 
    );
}


function Condition(props: ResourceTypeProps) {
    const url = props.base_url ?? new URL("http://localhost:8080/fhir");
    const patientRef = `Patient/${props.patient_id}`;
    const base_url = `${url.toString()}/Condition?subject=${patientRef}`;

    const {isPending, error, data, isFetching} = useQuery({
        queryKey: ['resourceTypeData'],
        queryFn: async() => {
        const response = await fetch(
            base_url.toString(),
        )
        return response.json()
        }
    })

    if (isPending) return <h1> Loading... </h1>
    if (error) return <h1> An error has occurred: {error.message} </h1>
    if (isFetching) return <div> {isFetching ? "Updating..." : ""} </div>

    console.log(data.entry);
    return (
        <div>
            <h1> Condition </h1>
            {data.entry?.map((r: any) => (
                <li key={r.resource?.id}>
                    {r.resource?.code?.text ?? ""}
                </li>
            ))
            }
        </div>
    );
}