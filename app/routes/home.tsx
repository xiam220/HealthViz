// import "../styling/home-styling.css";

import { Form } from "react-router";

export default function Home() {
  return (
    <>
      <div className="app-header">
        <h1> HealthViz </h1>
        <h2> An Online Platform to View Patient Profiles </h2>
      </div>

      <Form action="/profile" method="get"> 
        <input type="text" id="searchQuery" placeholder="Search patient..."/>
        <button type="submit"> Search </button>
      </Form>
    </>
  );
}

