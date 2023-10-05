import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import ProtectedRoute from "../pages/ProtectedRoute";
import AuthorizedPage from "./AuthorizedPage";
import DoctorPage from "../pages/DoctorPage";


export default (
  <>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/protected" element={<AuthorizedPage children={<ProtectedRoute />} />} />
        <Route path="/doctor" element={<AuthorizedPage children={<DoctorPage />} role={'Doctor'} />} />
      </Routes>
    </Router>
  </>
);
