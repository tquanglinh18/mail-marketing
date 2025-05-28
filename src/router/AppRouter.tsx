import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// Import các Components
import ViewExcel from "../pages/ViewExcel";
import NotFound from "../components/NotFound";
import CreateTeamplate from "../pages/CreateTemplate";
import Home from "../pages/Home";
import FileUploader from "../pages/FileUploader";
import LogsSendMail from "../pages/LogsSendMail";
import Contacts from "../pages/Contacts";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/CreateTemplate" element={<CreateTeamplate />} />
        <Route path="/ViewExcel" element={<ViewExcel />} />
        <Route path="/LogsSendMail" element={<LogsSendMail />} />
        <Route path="/ContactList" element={<Contacts />} />
        <Route path="/FileUploader" element={<FileUploader />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
