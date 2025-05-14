export function exportHtmlFile(
  editor: any | null,
  fileName: string = "exported-page.html"
) {
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
    <title>Exported Page</title>
    <style>
        ${css}
    </style>
    </head>
<body>
    ${html}
    </body>
</html>`;

  // Tạo một Blob từ chuỗi HTML
  const blob = new Blob([fullHtml], { type: "text/html" });

  // Tạo URL cho Blob
  const url = URL.createObjectURL(blob);

  // Tạo một thẻ <a> ẩn để trigger download
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName; // Đặt tên file khi tải về

  // Thêm thẻ <a> vào body, click nó, và xóa đi
  document.body.appendChild(a);
  a.click();

  // Dọn dẹp: Hủy URL tạm thời và xóa thẻ <a>
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
