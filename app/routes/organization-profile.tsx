import { useSearchParams } from "react-router";
import { useFetchQuery } from "../hooks/queryFhir";
import OrgDashboard from "../services/orgDashboard";

export default function OrganizationProfile() {
    const [params] = useSearchParams();
    const organizationName = params.get("organizationName");

    // Get organization id
    const org_resource_url = new URL("http://localhost:8080/fhir/Organization");

    if (organizationName) {
        org_resource_url.searchParams.append("name", organizationName);
     }
 
    const get_org = useFetchQuery("Organization", org_resource_url.toString()).data;
    const org_id = get_org?.entry?.[0]?.resource?.id;
    console.log(org_id);

    // Get all Patients that have visited the organization
    const org_patients_base_url = new URL("http://localhost:8080/fhir/Patient");
    // const org_patients_url = `http://localhost:8080/fhir/Patient?organization._has:_id:${org_id}`;
    const org_patients_url = `http://localhost:8080/fhir/Encounter?_count=5`
    
    const org_patients = useFetchQuery("OrganizationPatients", org_patients_url.toString());
    // console.log("org_patients", org_patients.data);

    return (
        <OrgDashboard/>
    );
}