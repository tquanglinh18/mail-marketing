import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ROUTES } from "../constants/routes";
import TemplateApi from "../libs/templateApi";

export const SaveTemplate = async (editor: any | null) => {
  const MySwal = withReactContent(Swal);

  if (!editor) {
    alert("Editor đang tải hoặc gặp lỗi, không thể xuất file lúc này.");
    return;
  }

  // Lấy nội dung HTML và CSS từ editor
  const html = editor.getHtml();
  const css = editor.getCss();

  // Tạo cấu trúc file HTML hoàn chỉnh
  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email</title>
    <style>
        ${css}
    </style>
    </head>
<body>
    ${html}
    </body>
</html>`;

  const { value: formValues } = await MySwal.fire({
    title: "Nhập thông tin mẫu email",
    html: `      <div style="text-align: left; margin-left: 10px;">
        <label for="title-template">Tiêu đề Template</label>
        <input style="width: 100%; margin: 4px 0 16px 0" id="title-template" class="swal2-input" placeholder="Ví dụ: Email đăng kí thành viên mới!"/> <br/>

        <label for="createdBy">Tên người lập</label><br/>
        <input style="width: 100%; margin: 4px 0 16px 0" id="createdBy" class="swal2-input" type="text" placeholder="Ví dụ: LinhTQ"/>
      </div>`,
    focusConfirm: false,
    showCancelButton: true,
    cancelButtonText: "Hủy",
    confirmButtonText: "Lưu",
    preConfirm: () => {
      const templateName = (
        document.getElementById("title-template") as HTMLInputElement
      )?.value;
      const createdBy = (
        document.getElementById("createdBy") as HTMLInputElement
      )?.value;

      if (!templateName || !createdBy) {
        Swal.showValidationMessage("Tiêu đề và người lập không được để trống!");
        return;
      }

      return {
        templateId: 0,
        templateName: templateName,
        htmlContent: fullHtml,
        imageStorageType: "local",
        createdDate: new Date().toISOString(),
        createdBy: createdBy,
      };
    },
  });

  if (formValues) {
    const response = await TemplateApi.create(formValues);
    if (response) {
      MySwal.fire({
        title: "Lưu mẫu thành công!",
        text: "Mẫu email đã được lưu thành công.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        window.location.href = ROUTES.DASHBOARD;
      });
    } else {
      MySwal.fire({
        title: "Lỗi!",
        text: "Không thể lưu mẫu email, vui lòng thử lại sau.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }
};
