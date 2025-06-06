import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import type { EmailTemplate } from "../../types/APIModel";
import Loading from "../../components/Loading";
import TemplateApi from "../../libs/templateApi";

export default function ListTemplates() {
  const [listTemplates, setListTemplates] = useState<EmailTemplate[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchTemplates = async () => {
    setIsLoading(true);
    try {
      const response = await TemplateApi.getAll();
      console.log("Templates fetched:", response);
      setListTemplates(response);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (error) {}
  };
  useEffect(() => {
      fetchTemplates();
  }, []);

  return (
    <div className="w-full container mx-auto my-8 flex flex-col items-center gap-8 p-8">
      <h1 className="w-full text-center text-white text-3xl">
        Danh sách mẫu Email
      </h1>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
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
                  Ngày tạo:
                  <b>
                    {new Date(temp.createdDate).toLocaleDateString("vi-VN")}
                  </b>
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
      )}
    </div>
  );
}
