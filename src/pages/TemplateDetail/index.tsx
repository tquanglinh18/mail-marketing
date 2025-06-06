import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import type { EmailTemplate } from "../../types/APIModel";
import { ROUTES } from "../../constants/routes";
import TemplateApi from "../../libs/TemplateApi";

export default function TemplateDetail() {
  const { id } = useParams();
  const [template, setTemplate] = useState<EmailTemplate>();
  const fetchTemplateById = async (id: number) => {
    try {
      var temp = await TemplateApi.getById(id);
      setTemplate(temp);
    } catch (error) {
      alert("Không tìm thấy mẫu Email với ID: " + id);
      window.location.href = ROUTES.LIST_TEMPLATES;
    }
  };
  useEffect(() => {
    fetchTemplateById(Number(id));
  }, [id]);
  return (
    <div>
      {template ? (
        <div className="w-full max-w-2xl mx-auto p-6 text-white">
          <h1 className="text-3xl font-bold mb-4">{template.templateName}</h1>
          <div className="w-full flex justify-between gap-4">
            <p className="mb-2">
              ID: <b>{template.templateId}</b>
            </p>
            <p className="mb-2">
              Ngày tạo:{" "}
              <b>
                {new Date(template.createdDate).toLocaleDateString("vi-VN")}
              </b>
            </p>
            <p className="mb-2">
              Người tạo: <b>{template.createdBy}</b>
            </p>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Nội dung mẫu:</h2>
            <div className="w-full p-2 border border-solid border-amber-100">
              <div
                className="html-content"
                dangerouslySetInnerHTML={{ __html: template.htmlContent }}
              />
            </div>
          </div>
        </div>
      ) : (
        <p>Loading template details...</p>
      )}
    </div>
  );
}
