// src/components/Home.tsx

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faAddressBook,
  faUpload,
  faComment,
  faCloud,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { useState, type FunctionComponent } from "react";
import CustomModal from "../../components/Modal/CustomModal";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div className="container flex flex-col justify-center items-center min-h-screen p-4 mx-auto gap-4">
      <h1 className="w-full text-white font-bold text-center mb-4 text-3xl">
        Marketing Email
      </h1>
      <div>
        <h1>My App</h1>
        <button onClick={openModal}>Open Modal</button>

        <CustomModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="My Custom Modal"
        >
          <p>This is the content of the modal!</p>
          <p>You can put any JSX elements here.</p>
          <button onClick={closeModal}>Close from inside</button>
        </CustomModal>
      </div>
      <div className="w-full grid grid-cols-4 gap-6">
        <a href="/CreateTemplate" className="ctn-grd-mormal">
          <div className="action-ic">
            <FontAwesomeIcon icon={faPlus} color="black" size="xl" />
          </div>
          <p className="action-name">Tạo template Email</p>
        </a>
        <a href="/ViewExcel" className="ctn-grd-mormal">
          <div className="action-ic">
            <FontAwesomeIcon icon={faUpload} color="black" size="xl" />
          </div>
          <p className="action-name">Upload File</p>
        </a>

        <a href="/ContactList" className="ctn-grd-mormal">
          <div className="action-ic">
            <FontAwesomeIcon icon={faAddressBook} color="black" size="xl" />
          </div>
          <p className="action-name">Danh sách người nhận</p>
        </a>

        <a href="/LogsSendMail" className="ctn-grd-mormal">
          <div className="action-ic">
            <FontAwesomeIcon icon={faComment} color="black" size="xl" />
          </div>
          <p className="action-name">Xem Logs</p>
        </a>

        <a href="/FileUploader" className="ctn-grd-mormal">
          <div className="action-ic">
            <FontAwesomeIcon icon={faCloud} color="black" size="xl" />
          </div>
          <p className="action-name"> S3</p>
        </a>

         <a href="/SendMail" className="ctn-grd-mormal">
          <div className="action-ic">
            <FontAwesomeIcon icon={faPaperPlane} color="black" size="xl" />
          </div>
          <p className="action-name">Gửi Mail</p>
        </a>
      </div>
    </div>
  );
};

export default Home;
