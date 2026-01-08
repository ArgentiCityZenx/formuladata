import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Drivers.css";

export default function Drivers() {
  const [pilotos, setPilotos] = useState([]);

  useEffect(() => {
    fetch("https://formuladata.onrender.com/api/drivers")
      .then(r => r.json())
      .then(data => setPilotos(data.drivers));
  }, []);

  return (
    <div className="drivers-page">
      <h1 className="drivers-title">F1 Drivers</h1>

      {pilotos.length === 0 && (
        <p className="loading">Loading drivers...</p>
      )}

      <ul className="drivers-list">
        {pilotos.map(p => (
          <li key={p.driver_number} className="driver-item">
            <Link
              to={`/driver/${p.driver_number}`}
              className="driver-link"
            >
              <span className="driver-name">
                #{p.driver_number} {p.full_name}
              </span>
              <span className="driver-team">
                {p.team_name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
