import "../styling/dashboard-styling.css";

export default function OrgDashboard(){
    return (
        <div className="org-display">
            <iframe
                className="dashboard"
                src="https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;He&#47;HealthViz_17791285104270&#47;Dashboard1&#47;1_rss.png"
                width="100%"
                height="100%"
                style={{border: "none"}}
            />
        </div>
    )
}