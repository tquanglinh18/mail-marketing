import { useEffect, useState, type FunctionComponent } from "react";
import RecipientsApi from "../../libs/RecipientsApi";
import type { EmailRecipient } from "../../types/APIModel";
import Loading from "../../components/Loading";

interface RecipientsProps {}

const Recipients: FunctionComponent<RecipientsProps> = () => {
  const [recipients, setRecipients] = useState<EmailRecipient[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchRecipients = async () => {
    setIsLoading(true);
    try {
      const response = await RecipientsApi.getAllRecipients();
      console.log("Fetched recipients:", response);
      setRecipients(response);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching recipients:", error);
    }
  };

  const searchByKeyword = async (key: string) => {
    const response = await RecipientsApi.searchByKeyword(key);
    console.log("Searched recipients:", response);
    // setRecipients(response);
  };
  useEffect(() => {
    fetchRecipients();
    searchByKeyword("Tran");
  }, []);
  return (
    <>
      <div className="w-full container mx-auto my-8 flex flex-col items-center gap-8 p-8">
        <h1 className="w-full text-center text-white text-3xl">
          Danh sách người nhận
        </h1>
        {isLoading ? (
          <Loading></Loading>
        ) : (
          <div className="w-full py-3 sm:py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 xl:grid-cols-4">
            {recipients.length === 0 && (
              <div className="w-full text-white text-center">
                Chưa có người nhận nào
              </div>
            )}
            {recipients.map((recipient, index) => {
              return (
                <div
                  key={index}
                  className="w-full py-3 sm:py-4 px-4 border border-gray-200 rounded-lg shadow-sm transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center">
                    <div className="shrink-0">
                      <img
                        className="w-8 h-8 rounded-full"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlRM2-AldpZgaraCXCnO5loktGi0wGiNPydQ&s"
                        alt="Neil image"
                      />
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium truncate text-white">
                        {recipient.recipientName === "" ? <span className="text-red-500 italic">NoName</span> : recipient.recipientName}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {recipient.recipientEmail}
                      </p>

                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {recipient.uploadBatch?.batchName}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold"></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Recipients;
