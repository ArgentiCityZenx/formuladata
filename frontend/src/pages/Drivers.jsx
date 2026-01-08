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
        return <p>Error loading drivers</p>;
    }

    if (pilotos.length === 0) {
        return <p>Loading drivers...</p>;
    }

    return (
        <div className="drivers-page">
            <h1 className="drivers-title">Drivers</h1>

            <div className="drivers-grid">
                {pilotos.map(p => (
                    <div className="driver-card" key={p.driver_number}>
                        <Link className="driver-link" to={`/driver/${p.driver_number}`}>
                            <div className="driver-left">
                                <span className="driver-name">{p.full_name}</span>
                                <span className="driver-team">{p.team_name}</span>
                            </div>

                            <span className="driver-number">{p.driver_number}</span>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
