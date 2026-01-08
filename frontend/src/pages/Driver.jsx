import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Driver() {
  const { number } = useParams();
  const [driver, setDriver] = useState(null);

  useEffect(() => {
    fetch(`https://formuladata.onrender.com/api/driver/${number}`)
      .then(r => r.json())
      .then(setDriver);
  }, [number]);

  if (!driver) return <div>Loading...</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{driver.full_name}</h1>
      <img
        src={driver.headshot_url}
        alt={driver.full_name}
        width="200"
      />
      <p>Team: {driver.team_name}</p>
      <p>Number: {driver.driver_number}</p>
      <p>Country: {driver.country_code}</p>
      <p>Broadcast Name: {driver.broadcast_name}</p>
    </div>
  );
}
