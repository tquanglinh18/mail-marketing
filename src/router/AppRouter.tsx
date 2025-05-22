import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// Import các Components
import ViewExcel from "../pages/ViewExcel";
import NotFound from "../components/NotFound";
import CreateTeamplate from "../pages/CreateTemplate";
import Home from "../pages/Home";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/CreateTemplate" element={<CreateTeamplate />} />
        <Route path="/ViewExcel" element={<ViewExcel />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
