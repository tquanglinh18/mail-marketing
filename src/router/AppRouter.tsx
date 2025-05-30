import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// Import các Components
import NotFound from "../components/NotFound";
import ContactsPage from "../pages/Recipients";
import CreateTeamplate from "../pages/CreateTemplate";
import FileUploader from "../pages/FileUploader";
import Home from "../pages/Home";
import LogsSendMail from "../pages/LogsSendMail";
import UploadFileRecipient from "../pages/UploadFileRecipient";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/CreateTemplate" element={<CreateTeamplate />} />
        <Route path="/UploadFileContact" element={<UploadFileRecipient />} />
        <Route path="/LogsSendMail" element={<LogsSendMail />} />
        <Route path="/ContactList" element={<ContactsPage />} />
        <Route path="/FileUploader" element={<FileUploader />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
