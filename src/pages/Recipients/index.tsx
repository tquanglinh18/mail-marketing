import { useEffect, useState, type FunctionComponent } from "react";
import RecipientsApi from "../../libs/RecipientsApi";
import type { EmailRecipient } from "../../types/APIModel";

interface ContactsPageProps {}

const ContactsPage: FunctionComponent<ContactsPageProps> = () => {
  const [recipients, setRecipients] = useState<EmailRecipient[]>([]);


      const fetchRecipients = async () => {
      const response = await RecipientsApi.getAllRecipients();
      console.log("Fetched recipients:", response);
      setRecipients(response);
    };

    const searchByKeyword = async (key: string ) => {
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
      <ul>
        {recipients.map((recipient, index) => {
          return (
            <li
              key={index}
            >{`Recipient: ${recipient.recipientName}, Email: ${recipient.recipientEmail}`}</li>
          );
        })}
      </ul>
    </>
  );
};

export default ContactsPage;
