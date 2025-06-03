export const SaveTemplate = (editor: any | null) => {
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

  console.log("Full HTML content:", fullHtml);
};
