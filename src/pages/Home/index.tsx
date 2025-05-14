// src/components/GrapesjsEditor.tsx

import { useEffect, useRef, useState, type FunctionComponent } from "react";
import { initGrapesJS } from "../../configs/GrapesJsConfig";
import { exportHtmlFile } from "../../utils/ExportHTMLUtils";

interface Props {}

const GrapesjsEditor: FunctionComponent<Props> = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorInstance = useRef<any>(null);

  // Thêm state để theo dõi trạng thái sẵn sàng của editor
  const [isEditorReady, setIsEditorReady] = useState(false);

  // useEffect để khởi tạo và dọn dẹp GrapesJS
  useEffect(() => {
    if (editorRef.current && !editorInstance.current) {
      editorInstance.current = initGrapesJS(editorRef.current.id);

      // ✅ Khi editor được khởi tạo xong và gán vào ref
      editorInstance.current.on("load", () => {
        setIsEditorReady(true); // ✅ Cập nhật state khi editor sẵn sàng
      });
      console.log("GrapesJS init called.");
    }

    return () => {
      if (editorInstance.current) {
        editorInstance.current.destroy();
        editorInstance.current = null;
        setIsEditorReady(false);
      }
    };
  }, []);

  // Hàm xử lý khi click nút xuất file
  const handleExportClick = () => {
    exportHtmlFile(editorInstance.current, "my-landing-page.html");
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex justify-center items-center p-4">
        <button
          onClick={handleExportClick}
          disabled={!isEditorReady}
          className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
        >
          {isEditorReady ? "Xuất File HTML" : "Editor đang tải..."}
        </button>
        {!isEditorReady && (
          <span style={{ marginLeft: "10px" }}>Đang tải Editor...</span>
        )}
      </div>

      <div
        className="w-full h-full min-h-[100vh]"
        id="grapes-editor"
        ref={editorRef}
        style={{ flexGrow: 1 }}
      ></div>
    </div>
  );
};

export default GrapesjsEditor;
