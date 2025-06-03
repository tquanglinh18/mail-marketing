import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ROUTES } from "../constants/routes";

// Import các Components
import NotFound from "../components/NotFound";
import CreateTeamplate from "../pages/CreateTemplate";
import ListTemplates from "../pages/EmailTemplate";
import FileUploader from "../pages/FileUploader";
import Dashboard from "../pages/Home";
import LogsSendMail from "../pages/LogsSendMail";
import Recipients from "../pages/Recipients";
import SendMail from "../pages/SendMail";
import UploadFileRecipient from "../pages/UploadFileRecipient";
import TemplateDetail from "../pages/TemplateDetail";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.HOME} element={<Dashboard />} />
        <Route path={ROUTES.CREATE_TEMPLATE} element={<CreateTeamplate />} />
        <Route
          path={ROUTES.UPLOAD_FILE_RECIPIENT}
          element={<UploadFileRecipient />}
        />
        <Route path={ROUTES.LOGS_SEND_MAIL} element={<LogsSendMail />} />
        <Route path={ROUTES.RECIPIENTS} element={<Recipients />} />
        <Route path={ROUTES.FILE_UPLOADER} element={<FileUploader />} />
        <Route path={ROUTES.SEND_MAIL} element={<SendMail />} />
        <Route path={ROUTES.LIST_TEMPLATES} element={<ListTemplates />} />
        <Route path={ROUTES.TEMPLATE_DETAIL} element={<TemplateDetail />} />
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
