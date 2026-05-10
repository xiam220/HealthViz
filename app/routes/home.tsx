import "../styling/home-styling.css";
import { useState } from "react";
import { Form } from "react-router";
import { useNavigate } from "react-router";


export default function Home() {
  const navigate = useNavigate();
  const [givenName, setGivenName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [birthDate, setBirthDate] = useState("");


  function handleSearch() {
    if (!givenName || !familyName || !birthDate) {
      alert("Please fill in all fields");
      return null;
    }

    const params = new URLSearchParams();

    params.append("givenName", givenName);
    params.append("familyName", familyName);
    params.append("birthDate", birthDate);

    navigate(`/profile?${params.toString()}`);
  }

  return (
    <div>
      <h1 className="webpage-title"> Health Viz</h1>
      <h2 className="webpage-description"> An Online Platform to View Patient Profiles and Trends </h2>

      <Form className="search-terms" action="/profile" >
        <input name="givenName" type="text" placeholder="First Name (e.g. John)" onChange={(e) => setGivenName(e.target.value)}/>
        <input name="familyName" type="text" placeholder="Last Name (e.g. Doe)" onChange={(e) => setFamilyName(e.target.value)}/>
        <input name="birthDate" type="text" placeholder="Birth Date (YYYY-MM-DD)" onChange={(e) => setBirthDate(e.target.value)}/>
      </Form>
      
      <button className="submit-button" type="button" onClick={handleSearch}> Search </button>
    </div> 
  );
}

