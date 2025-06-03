import { ROUTES } from "./routes";
import {
  faAddressBook,
  faCloud,
  faComment,
  faListOl,
  faPaperPlane,
  faPlus,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";

interface PageAction {
  to: string;
  icon: any;
  label: string;
}

export const pageAction: PageAction[] = [
  {
    to: ROUTES.CREATE_TEMPLATE,
    icon: faPlus,
    label: "Tạo template Email",
  },
  {
    to: ROUTES.LIST_TEMPLATES,
    icon: faListOl,
    label: "List Templates",
  },
  {
    to: ROUTES.UPLOAD_FILE_RECIPIENT,
    icon: faUpload,
    label: "Upload File",
  },
  {
    to: ROUTES.FILE_UPLOADER,
    icon: faCloud,
    label: "S3 Cloud",
  },
  {
    to: ROUTES.RECIPIENTS,
    icon: faAddressBook,
    label: "Danh sách người nhận",
  },

  {
    to: ROUTES.SEND_MAIL,
    icon: faPaperPlane,
    label: "Gửi Mail",
  },
  {
    to: ROUTES.LOGS_SEND_MAIL,
    icon: faComment,
    label: "Xem Logs",
  },
];
