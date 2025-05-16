import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";

// Import các gói plugin
import gjsBlocksBasic from "grapesjs-blocks-basic";
import grapesjsComponentCountdown from "grapesjs-component-countdown";
import grapesjsCustomCode from "grapesjs-custom-code";
import grapesjsNavbar from "grapesjs-navbar";
import grapesjsPluginForms from "grapesjs-plugin-forms";
import grapesjsTabs from "grapesjs-tabs";
import { exportHtmlFile } from "../utils/ExportHTMLUtils";

export function initGrapesJS(containerId: string) {
  const editor = grapesjs.init({
    container: `#${containerId}`,
    // Cấu hình cơ bản
    height: "100vh", // Chiều cao của editor
    width: "100%", // Chiều rộng của editor
    fromElement: false, // Editor sẽ không tải nội dung từ DOM element ban đầu
    showOffsets: true, // Hiển thị offset khi hover các block
    noticeOnUnload: true, // Hỏi người dùng trước khi rời trang nếu có thay đổi

    // Cấu hình Storage Manager (tự động lưu/tải nội dung)
    storageManager: {
      type: "local", // Lưu vào Local Storage của trình duyệt
      autosave: true, // Tự động lưu sau mỗi thay đổi
      autoload: true, // Tự động tải nội dung khi khởi tạo editor
    },

    // Danh sách các plugin cần kích hoạt
    plugins: [
      gjsBlocksBasic,
      grapesjsPluginForms,
      grapesjsComponentCountdown,
      grapesjsNavbar,
      grapesjsTabs,
      grapesjsCustomCode,
    ],

    // Tùy chọn cấu hình cho từng plugin
    pluginsOpts: {
      "gjs-blocks-basic": { flexGrid: true },
      "grapesjs-plugin-forms": {},
      "grapesjs-navbar": {},
      "grapesjs-tabs": {},
      "grapesjs-custom-code": {},
      "grapesjs-component-countdown": {},
    },
  });

  const panels = editor.Panels;
  editor.Commands.add("export-html-command", {
    run: (editor, sender) => {
      if (sender) {
        sender.set("active", false); // Tắt nút sau khi click
      }
      exportHtmlFile(editor, "mail-teamplate.html");
    },
    stop: (_editor, sender) => {
      if (sender) {
        sender.set("active", false); // Tắt nút sau khi click
      }
    },
  });

  const panelsOptions = panels.getPanel("options");

  if (panelsOptions) {
    panelsOptions.get("buttons")?.add([
      {
        content: "Export HTML", // Nội dung của nút
        id: "export-html",
        className: "fa fa-download",
        command: "export-html-command",
        attributes: {
          title: "Export Fullpage HTML", // Tooltip khi hover
        },
      },
    ]);
  } else {
    console.error("Không tìm thấy panels trong GrapesJS");
  }

  return editor;
}
