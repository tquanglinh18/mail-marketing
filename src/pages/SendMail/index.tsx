import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import Loading from "../../components/Loading";
import RecipientsApi from "../../libs/RecipientsApi";
import TemplateApi from "../../libs/templateApi";
import type {
  EmailTemplate,
  NormalObject,
  SendMailRequest,
  UploadBatch,
} from "../../types/APIModel";
import Swal from "sweetalert2";
import SendMailApi from "../../libs/SendMailApi";
import { ROUTES } from "../../constants/routes";

export default function SendMail() {
  const [listTemplates, setListTemplates] = useState<EmailTemplate[]>([]);
  const [lstBatch, setLstBatch] = useState<UploadBatch[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputFields, setInputFields] = useState([{ key: "", value: "" }]);
  const [error, setError] = useState<string | null>(null);
  const [selTemp, setSelTemp] = useState<number | null>(null);
  const [selBatch, setSelBatch] = useState<number | null>(null);
  const [sending, setSending] = useState<boolean>(false);

  const handleAddFields = () => {
    setInputFields([...inputFields, { key: "", value: "" }]);
  };

  const handleInputChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const values = [...inputFields];
    const { name, value } = event.target;

    if (name === "key") {
      values[index].key = value;
    } else if (name === "value") {
      values[index].value = value;
    }
    setInputFields(values);
  };

  const handleTemplateChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelTemp(parseInt(event.target.value, 10));
    console.log("selTemp: ", selTemp);
  };

  const handleBatchChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelBatch(parseInt(event.target.value, 10));
    console.log("selBatch: ", selBatch);
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setSending(true);
    const globalVar: NormalObject = {};

    for (const field of inputFields) {
      if (field.key.trim() !== "") {
        globalVar[field.key] = field.value;
      }
    }
    if (selTemp === null) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Vui lòng chọn mẫu Email!",
      });
      return;
    }
    if (selBatch === null) {
      setError("Vui lòng chọn một File người nhận.");
      return;
    }

    const requestPayload: SendMailRequest = {
      templateId: selTemp,
      uploadBatchId: selBatch,
      globalMergeFields: globalVar,
    };

    try {
      const response = await SendMailApi.sendMailWithMailgun(requestPayload);

      if (response) {
        Swal.fire({
          icon: "success",
          title: "Thành công!",
          text: response.message || "Email đã được gửi thành công.",
        }).then(() => {
          window.location.href = ROUTES.DASHBOARD;
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Gửi Email thất bại",
          text: response || "Có lỗi xảy ra từ phía server. Vui lòng thử lại.",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gửi Email thất bại",
        text: "Đã xảy ra lỗi khi gửi email. Vui lòng thử lại.",
      });
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    const fetchTemplatesAndBatch = async () => {
      setIsLoading(true);
      try {
        const [lstTem, lstBatch] = await Promise.all([
          TemplateApi.getAll(),
          RecipientsApi.getAllBatch(),
        ]);
        setListTemplates(lstTem);
        setLstBatch(lstBatch);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Đã xảy ra lỗi không xác định.";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTemplatesAndBatch();
  }, []);

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (error) {
    return <div style={{ color: "red" }}>Lỗi: {error}</div>;
  }

  return (
    <div className="w-full text-white container mx-auto my-8">
      <h1 className="w-full text-center text-3xl font-bold mb-8">
        Điền thông tin gửi Mail
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-8 max-w-lg mx-auto"
      >
        <div className="w-full">
          <label htmlFor="template_select" className="text-gray-500">
            Chọn mẫu Email
          </label>
          <select
            id="template_select"
            defaultValue={"default"}
            onChange={handleTemplateChange}
            className="block py-2.5 px-0 w-full text-sm 0 bg-transparent border-0 border-b-2 border-gray-200 appearance-none text-white focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          >
            <option selected disabled value={"default"}>
              Choose a template
            </option>

            {listTemplates.map((temp, index) => {
              return (
                <option key={index} value={temp.templateId}>
                  {temp.templateName} - ID: {temp.templateId}
                </option>
              );
            })}
          </select>
        </div>

        <div className="w-full">
          <label htmlFor="batch_select" className="text-gray-500">
            Chọn File người nhận
          </label>
          <select
            id="batch_select"
            defaultValue={"default"}
            onChange={handleBatchChange}
            className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-200 appearance-none text-white focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          >
            <option selected disabled value={"default"}>
              Choose a Batch
            </option>

            {lstBatch.map((batch, index) => {
              return (
                <option key={index} value={batch.batchId}>
                  {batch.batchName} - ID: {batch.batchId}
                </option>
              );
            })}
          </select>
        </div>

        <div className="w-full flex flex-col gap-2 text-white">
          <h2 className="text-gray-500">Global Variables</h2>
          {inputFields.map((inputField, index) => (
            <div
              key={index}
              className="w-[95%] mx-auto mb-2 grid grid-cols-2 gap-4 last:mb-0 text-white"
            >
              <input
                type="text"
                name="key"
                placeholder="Key"
                value={inputField.key}
                onChange={(event) => handleInputChange(index, event)}
                className="py-2 focus:outline-none focus:ring-0 focus:border-gray-200 peer  border-b-2 border-gray-200 "
              />
              <input
                type="text"
                name="value"
                placeholder="Value"
                value={inputField.value}
                onChange={(event) => handleInputChange(index, event)}
                className="py-2 focus:outline-none focus:ring-0 focus:border-gray-200 peer  border-b-2 border-gray-200 "
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={handleAddFields}
          className="w-fit mx-auto cursor-pointer relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          <span className="relative text-white px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent">
            +
          </span>
        </button>
        {/* <button
          type="submit"
          className="w-fit min-w-[124px] cursor-pointer p-2 rounded-xl flex justify-center items-center ml-auto text-white bg-blue-700 hover:bg-blue-800 text-center"
        >
          Gửi
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path stroke="currentColor" d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
        </button> */}
        <button
          type="submit"
          className="w-fit min-w-[124px] cursor-pointer ml-auto flex justify-center items-center text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          {sending ? (
            <>
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Đang gửi...
            </>
          ) : (
            <>
              Gửi
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path stroke="currentColor" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
