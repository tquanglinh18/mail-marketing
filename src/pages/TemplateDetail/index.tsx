import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import templateApi from "../../libs/templateApi";
import type { EmailTemplate } from "../../types/APIModel";

export default function TemplateDetail() {
  const { id } = useParams();
  const [template, setTemplate] = useState<EmailTemplate>();
  const fetchTemplateById = async (id: number) => {
    try {
      var temp = await templateApi.getById(id);
      setTemplate(temp);
      console.log("Template fetched:", temp);
    } catch (error) {
      console.error("Error fetching template by ID:", error);
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
          <div className="w-full flex gap-4">
            <p className="mb-2">
              <strong>ID:</strong> {template.templateId}
            </p>
            <p className="mb-2">
              <strong>Ngày tạo:</strong> {template.createdDate}
            </p>
            <p className="mb-2">
              <strong>Người tạo:</strong> {template.createdBy}
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
