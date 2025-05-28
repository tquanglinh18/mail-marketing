// src/components/Home.tsx

import { type FunctionComponent } from "react";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen">
      <h1>Chọn tác vụ bạn muốn:</h1>
      <a
        href="/CreateTemplate"
        className="inline-flex bg-blue-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-black my-4"
      >
        Tạo mẫu email
      </a>
      <a
        href="/ViewExcel"
        className="inline-flex bg-blue-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-black my-4"
      >
        Upload file Excel
      </a>

            <a
        href="/ContactList"
        className="inline-flex bg-blue-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-black my-4"
      >
        Xem tất cả các contacts
      </a>

            <a
        href="/LogsSendMail"
        className="inline-flex bg-blue-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-black my-4"
      >
        Xem Logs
      </a>

                  <a
        href="/FileUploader"
        className="inline-flex bg-blue-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-black my-4"
      >
        Uploader File S3
      </a>
    </div>
  );
};

export default Home;
