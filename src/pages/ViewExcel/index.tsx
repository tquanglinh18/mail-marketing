import type { FunctionComponent } from "react";
import { mergeExcelTemplateAndLog } from "../../utils/MailingTemplate";

interface ViewExcelProps {}

const ViewExcel: FunctionComponent<ViewExcelProps> = () => {
  const sampleExcelPath: string = "recipients.xlsx";

  const sampleTemplate: string = `
Kính gửi: <<Name>>,

Cảm ơn bạn đã quan tâm đến bản tin của chúng tôi.

Chi tiết đơn hàng gần đây nhất của bạn:
Mã đơn hàng: <<OrderCode>>
Địa chỉ giao hàng: <<Address>>

Nếu có bất kỳ câu hỏi nào, vui lòng liên hệ lại.

Trân trọng,
Đội ngũ <<CompanyName>>
`; // Bạn có thể tùy chỉnh template này

  mergeExcelTemplateAndLog(sampleExcelPath, sampleTemplate);
  return <></>;
};

export default ViewExcel;
