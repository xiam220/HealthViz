import "../styling/home-styling.css";
import { useState } from "react";
import { Form } from "react-router";
import { useNavigate } from "react-router";


export default function Home() {
  const navigate = useNavigate();
  const [givenName, setGivenName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [organizationName, setOrganizationName] = useState("");


  function handlePatientSearch() {
    if (!givenName || !familyName || !birthDate) {
      alert("Please fill in all fields");
      return null;
    }

    const params = new URLSearchParams();

    params.append("givenName", givenName);
    params.append("familyName", familyName);
    params.append("birthDate", birthDate);

    navigate(`/patient-profile?${params.toString()}`);
  }

    function handleOrganizationSearch() {
    if (!organizationName) {
      alert("Please fill in all fields");
      return null;
    }

    const params = new URLSearchParams();

    params.append("organizationName", organizationName);

    navigate(`/organization-profile?${params.toString()}`);
  }

  
  return (
    <div>
      <h1 className="webpage-title"> Health Viz</h1>
      <h2 className="webpage-description"> An Online Platform to View Patient Profiles and Trends </h2>

      <h3> Search By Patient </h3>
      <Form className="patient-search-terms" action="/patient-profile" >
        <input name="givenName" type="text" placeholder="First Name (e.g. John)" onChange={(e) => setGivenName(e.target.value)}/>
        <input name="familyName" type="text" placeholder="Last Name (e.g. Doe)" onChange={(e) => setFamilyName(e.target.value)}/>
        <input name="birthDate" type="text" placeholder="Birth Date (YYYY-MM-DD)" onChange={(e) => setBirthDate(e.target.value)}/>
      </Form>
      <button className="patient-submit-button" type="button" onClick={handlePatientSearch}> Search </button>
      
      <h3> Search By Organization </h3>
      <Form className="organization-search-terms" action="/organization-profile">
        <input name="organization-name" type="text" placeholder="Hospital Name" onChange={(e) => setOrganizationName(e.target.value)}/>
      </Form>
      <button className="organization-submit-button" type="button" onClick={handleOrganizationSearch}> Search </button>
      
    </div> 
  );
}

