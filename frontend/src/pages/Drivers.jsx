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
            <div className="drivers-header">
                <h1 className="drivers-title">F1 Drivers</h1>
                <span className="drivers-count">{pilotos.length} drivers</span>
            </div>

            {pilotos.length === 0 ? (
                <div className="loading">Loading drivers...</div>
            ) : (
                <ul className="drivers-list">
                    {pilotos.map(p => (
                        <li className="driver-item" key={p.driver_number}>
                            <Link className="driver-link" to={`/driver/${p.driver_number}`}>
                                <div className="driver-top">
                                    <span className="driver-name">{p.full_name}</span>
                                    <span className="driver-number">#{p.driver_number}</span>
                                </div>

                                <span className="driver-team">{p.team_name}</span>

                                <div className="driver-footer">
                                    <span className="view-profile">View profile →</span>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
