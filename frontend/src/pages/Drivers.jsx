import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Drivers() {
  const [pilotos, setPilotos] = useState([]);

  useEffect(() => {
    fetch("https://formuladata.onrender.com/api/drivers")
      .then(r => {
        if (!r.ok) throw new Error("fetch failed");
        return r.json();
      })
      .then(data => {
        if (!Array.isArray(data)) {
          setPilotos([]);
          return;
        }
        setPilotos(data);
      })
      .catch(() => setPilotos([]));
  }, []);

  if (!Array.isArray(pilotos)) {
    return <p>Error cargando pilotos</p>;
  }

  if (pilotos.length === 0) {
    return <p>Cargando pilotos...</p>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>F1 Drivers</h1>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {pilotos.map(p => (
          <li key={p.driver_number}>
            <Link to={`/driver/${p.driver_number}`}>
              {p.full_name} ({p.team_name})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
