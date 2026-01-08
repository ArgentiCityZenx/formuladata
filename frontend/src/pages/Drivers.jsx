import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Drivers() {
  const [pilotos, setPilotos] = useState([]);

  useEffect(() => {
    fetch("https://formuladata.onrender.com/api/drivers")
      .then(r => r.json())
      .then(setPilotos);
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>F1 Drivers</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {pilotos.map(p => (
          <li key={p.driver_number} style={{ margin: "1rem 0" }}>
            <Link to={`/driver/${p.driver_number}`}>
              {p.full_name} ({p.team_name})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
