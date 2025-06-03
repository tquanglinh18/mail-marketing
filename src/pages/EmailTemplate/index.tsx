import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import templateApi from "../../libs/templateApi";
import type { EmailTemplate } from "../../types/APIModel";

export default function ListTemplates() {
  const [listTemplates, setListTemplates] = useState<EmailTemplate[]>([]);
  const fetchTemplates = async () => {
    try {
      const response = await templateApi.getAll();
      console.log("Templates fetched:", response);
      setListTemplates(response);
    } catch (error) {}
  };
  useEffect(() => {
    fetchTemplates();
  }, []);

  return (
    <div className="w-full container mx-auto my-8 flex flex-col items-center gap-8">
      <h1 className="w-full text-center text-white text-3xl">
        Danh sách mẫu Email
      </h1>
      <div className="w-full mx-auto grid grid-cols-3 gap-8">
        {listTemplates.map((temp) => {
          return (
            <div
              key={temp.templateId}
              className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm"
            >
              <h5 className="w-full mb-2 text-2xl font-bold tracking-tight text-gray-900">
                {temp.templateName}
              </h5>
              <p className="w-full mb-3 font-normal text-gray-700">
                ID: <b>{temp.templateId}</b>
              </p>

              <p className="w-full mb-3 font-normal text-gray-700">
                Ngày tạo: <b>{temp.createdDate}</b>
              </p>
              <p className="w-full mb-3 font-normal text-gray-700">
                Người tạo: <b>{temp.createdBy}</b>
              </p>

              <Link
                to={ROUTES.TEMPLATE_DETAIL.replace(
                  ":id",
                  temp.templateId.toString()
                )}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg"
              >
                Chi tiết
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
