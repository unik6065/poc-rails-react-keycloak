import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import ProtectedRoute from "../pages/ProtectedRoute";


export default (
  <>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/protected" element={<ProtectedRoute />} />
      </Routes>
    </Router>
  </>
);
