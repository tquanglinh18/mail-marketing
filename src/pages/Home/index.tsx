// src/components/GrapesjsEditor.tsx

import { useEffect, useRef, type FunctionComponent } from "react";
import { initGrapesJS } from "../../configs/GrapesJsConfig";

interface GrapesjsEditorProps {}

const GrapesjsEditor: FunctionComponent<GrapesjsEditorProps> = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorInstance = useRef<any>(null);

  // useEffect để khởi tạo và dọn dẹp GrapesJS
  useEffect(() => {
    if (editorRef.current && !editorInstance.current) {
      editorInstance.current = initGrapesJS(editorRef.current.id);
    }

    return () => {
      if (editorInstance.current) {
        editorInstance.current.destroy();
        editorInstance.current = null;
      }
    };
  }, []);

  return (
    <div
      className="w-full h-full min-h-[100vh]"
      id="grapes-editor"
      ref={editorRef}
    ></div>
  );
};

export default GrapesjsEditor;
