import React from "react";
import { Routes, Route } from "react-router-dom";
import Drivers from "./pages/Drivers.jsx";
import Driver from "./pages/Driver.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Drivers />} />
      <Route path="/driver/:number" element={<Driver />} />
    </Routes>
  );
}
