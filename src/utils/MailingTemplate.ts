

import * as xlsx from 'xlsx';

interface RecipientData {
  [key: string]: any; // key là tên cột (string), value có thể là bất kỳ kiểu dữ liệu nào từ Excel
}

function escapeRegExp(string: string): string {
  // Các ký tự đặc biệt trong regex: ., +, ?, ^, $, {, }, (, ), |
  // Lưu ý: dấu ] và \ cũng cần escape, $& nghĩa là toàn bộ chuỗi khớp
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function PersionalizeContent(templateContent: string, recipientData: RecipientData) {
  let personalizedContent: string = templateContent;

  if (!recipientData) {
    console.warn("personalizeContent: recipientData is null or undefined.");
    return templateContent;
  }

  Object.keys(recipientData).forEach((fieldName: string) => {
    const placeholder : string = `<<${fieldName}>>`;

    const fieldValue: string = recipientData[fieldName] != null ? String(recipientData[fieldName]) : '';

      // Sử dụng Regular Expression để tìm và thay thế TẤT CẢ các lần xuất hiện của placeholder.
      const regex: RegExp = new RegExp(escapeRegExp(placeholder), 'g'); // 'g' là cờ global

      personalizedContent = personalizedContent.replace(regex, fieldValue);
  })
}

export async function mergeExcelTemplateAndLog(excelFilePath: string, emailTemplate: string): Promise<void> {
    try {
        // 1. Đọc file Excel
        console.log(`Đang đọc file Excel: ${excelFilePath}`);
        // xlsx.readFile trả về Workbook
        const workbook: xlsx.WorkBook = xlsx.readFile(excelFilePath);

        // Lấy tên sheet đầu tiên
        const sheetName: string = workbook.SheetNames[0];
        // Lấy sheet theo tên
        const worksheet: xlsx.WorkSheet = workbook.Sheets[sheetName];

        // 2. Chuyển đổi dữ liệu sheet sang JSON (mảng các mảng)
        // { header: 1 } -> sử dụng dòng đầu tiên làm header (tên cột)
        // { raw: false } -> cố gắng giữ định dạng (ví dụ: ngày tháng)
        // Sheet_to_json với header:1 trả về Array<Array<any>>
        const excelData: any[][] = xlsx.utils.sheet_to_json(worksheet, { header: 1, raw: false }) as any[][];


        // Lấy dòng header và dữ liệu các dòng tiếp theo
        const headersRow: any[] | undefined = excelData[0];

        if (!headersRow || headersRow.length === 0) {
            console.error("File Excel không có dòng header hoặc dòng header trống.");
            return;
        }

        // Lọc bỏ các header null/undefined/empty string và chuyển thành string
        const headers: string[] = headersRow
             .filter(header => header != null && String(header).trim() !== '')
             .map(header => String(header).trim()); // Đảm bảo header là string và loại bỏ khoảng trắng thừa

        if (headers.length === 0) {
             console.error("File Excel có dòng header nhưng không có tên cột hợp lệ.");
             return;
        }


        // Lấy dữ liệu từ dòng thứ 2 trở đi và map thành mảng các RecipientData object
        const recipientsData: RecipientData[] = excelData.slice(1) // Bỏ qua dòng header
            // Lọc bỏ các dòng trống (kiểm tra có ít nhất 1 ô không rỗng/null/khoảng trắng)
            .filter(row => row.some(cell => cell != null && String(cell).trim() !== ''))
            .map(row => {
                const rowData: RecipientData = {};
                headers.forEach((header, index) => {
                    // Gán giá trị vào object dùng tên header làm key
                    // Kiểm tra xem index có hợp lệ với độ dài của dòng không
                    if (index < row.length) {
                         rowData[header] = row[index];
                    } else {
                         // Nếu dòng ngắn hơn số lượng header, gán undefined hoặc null
                         rowData[header] = undefined;
                    }
                });
                return rowData;
            });


        // Kiểm tra xem có dữ liệu người nhận sau khi lọc không
        if (recipientsData.length === 0) {
             console.log("File Excel không có dữ liệu người nhận sau dòng header hoặc tất cả các dòng dữ liệu đều trống.");
             return; // Dừng nếu không có dữ liệu
        }

        console.log(`Đã đọc thành công ${recipientsData.length} dòng dữ liệu người nhận.`);
        console.log("\n--- Bắt đầu trộn dữ liệu và hiển thị kết quả ---");

        // 3. Lặp qua từng người nhận và trộn dữ liệu vào template, sau đó in ra console
        recipientsData.forEach((recipient, index) => {
             // Index + 2 vì dòng 1 là header, dòng 2 là recipient đầu tiên (index 0)
             console.log(`\n--- Kết quả cho dòng Excel số ${index + 2} (Index dữ liệu: ${index}) ---`);

             // Trộn dữ liệu cá nhân vào template
             const personalizedContent = PersionalizeContent(emailTemplate, recipient);

             // In kết quả ra console
             console.log(personalizedContent);

             console.log("-------------------------------------------------"); // Dấu phân cách
        });

        console.log("--- Kết thúc quá trình trộn dữ liệu và hiển thị ---");

    } catch (error: any) { // Bắt lỗi với kiểu any hoặc Error
        console.error("\nĐã xảy ra lỗi trong quá trình xử lý:");
        console.error(error); // In chi tiết lỗi
        if (error.stack) {
             console.error(error.stack); // In stack trace nếu có
        }
    }
}

