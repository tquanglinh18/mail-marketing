import React, { useEffect, useState } from "react";
import type { EmailTemplate } from "../../types/APIModel";
import templateApi from "../../libs/TemplateApi";

export default function SendMail() {
  const [listTemplates, setListTemplates] = useState<EmailTemplate[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchTemplates = async () => {
    setIsLoading(true);
    try {
      const response = await templateApi.getAll();
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
    <div>
      <form className="max-w-sm mx-auto">
        <label htmlFor="underline_select" className="sr-only">
          Underline select
        </label>
        <select
          id="underline_select"
          className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
        >
          <option selected>Choose a Template</option>

          {listTemplates.map((temp, index) => {
            return (
              <option key={index} value={temp.templateId}>
                {temp.templateName} - ID: {temp.templateId}
              </option>
            );
          })}
        </select>
      </form>
    </div>
  );
}
