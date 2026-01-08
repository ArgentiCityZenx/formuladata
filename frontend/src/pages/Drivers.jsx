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
            <h1 className="drivers-title">Formula 1 Drivers</h1>
            <p className="drivers-subtitle">
                Complete driver dataset powered by OpenF1
            </p>

            <div className="drivers-grid">
                {pilotos.map(p => (
                    <div className="driver-card" key={p.driver_number}>
                        <span className="driver-number">#{p.driver_number}</span>

                        <img
                            className="driver-image"
                            src={p.headshot_url || "/placeholder.png"}
                            alt={p.full_name}
                        />

                        <div className="driver-name">{p.full_name}</div>
                        <div className="driver-team">{p.team_name}</div>

                        <div
                            className="driver-divider"
                            style={{ background: `#${p.team_colour}` }}
                        />

                        <div className="driver-meta">
                            <span>{p.country_code}</span>
                            <span>{p.name_acronym}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
