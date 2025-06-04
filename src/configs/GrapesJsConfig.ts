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
import { SaveTemplate } from "../utils/SaveTemplate";

export function initGrapesJS(containerId: string) {
  const editor = grapesjs.init({
    container: `#${containerId}`,
    height: "100vh",
    width: "100%",
    fromElement: false,
    showOffsets: true,
    noticeOnUnload: true,
    storageManager: {
      type: "local",
      autosave: true,
      autoload: false,
    },

    plugins: [
      gjsBlocksBasic,
      grapesjsPluginForms,
      grapesjsComponentCountdown,
      grapesjsNavbar,
      grapesjsTabs,
      grapesjsCustomCode,
    ],

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
        sender.set("active", false);
      }
      exportHtmlFile(editor, "mail-teamplate.html");
    },
    stop: (_editor, sender) => {
      if (sender) {
        sender.set("active", false);
      }
    },
  });

  editor.Commands.add("redirect-to-home-page", {
    run: (_editor, sender) => {
      if (sender) {
        sender.set("active", false);
      }
      window.location.href = "./";
    },
    stop: (_editor, sender) => {
      if (sender) {
        sender.set("active", false);
      }
    },
  });

  editor.Commands.add("save-template", {
    run: (_editor, sender) => {
      if (sender) {
        sender.set("active", false);
      }
      console.log("Redirecting to home page...");
      SaveTemplate(_editor);
    },
    stop: (_editor, sender) => {
      if (sender) {
        sender.set("active", false);
      }
    },
  });

  const panelsOptions = panels.getPanel("options");

  if (panelsOptions) {
    panelsOptions.get("buttons")?.add([
      {
        content: "Export HTML",
        id: "export-html",
        className: "fa fa-download",
        command: "export-html-command",
        attributes: {
          title: "Export Fullpage HTML",
        },
      },
    ]);

    panelsOptions.get("buttons")?.add([
      {
        content: "Home",
        id: "redirect-home",
        className: "fa fa-home",
        command: "redirect-to-home-page",
        attributes: {
          title: "Trở về trang chủ",
        },
      },
    ]);

    panelsOptions.get("buttons")?.add([
      {
        content: "Lưu mẫu",
        id: "save-template",
        className: "fa fa-save",
        command: "save-template",
        attributes: {
          title: "Lưu mẫu email",
        },
      },
    ]);
  } else {
    console.error("Không tìm thấy panels trong GrapesJS");
  }

  return editor;
}
