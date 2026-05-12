import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import PatientHistory from "../services/patientHistory";


export default function PatientProfile() {
  const [params] = useSearchParams();
  const givenName = params.get("givenName");
  const familyName = params.get("familyName");
  const birthDate = params.get("birthDate");  

  const url = new URL("http://localhost:8080/fhir/Patient");
    
  if (givenName && familyName && birthDate) {
    url.searchParams.append("given", givenName);
    url.searchParams.append("family", familyName);
    url.searchParams.append("birthdate", birthDate);
  }

  const {isPending, error, data, isFetching} = useQuery({
    queryKey: ['patientData'],
    queryFn: async() => {
      const response = await fetch(
        url.toString(),
      )
      return response.json()
    }
  })

  const patientResource = data?.entry?.[0]?.resource;

  if (isPending) return <h1> Loading... </h1>
  if (error) return <h1> An error has occurred: {error.message} </h1>
  if (isFetching) return <div> {isFetching ? "Updating..." : ""} </div>

  console.log(data);
  return (
    <div>
      <p> Name: {patientResource.name?.[0]?.given?.[0]} {patientResource.name?.[0]?.family} </p>
      <p> DOB: {patientResource.birthDate} </p>
      <p> Phone: {patientResource.telecom?.[0]?.value} </p>
      <p> Address:&nbsp;
        {patientResource.address?.[0]?.line}&nbsp;
        {patientResource.address?.[0]?.city},&nbsp;
        {patientResource.address?.[0]?.state}&nbsp;
        {patientResource.address?.[0]?.postalCode} 
      </p>
      <PatientHistory
        patient_id={patientResource?.id}
        />
    </div>
  );
}