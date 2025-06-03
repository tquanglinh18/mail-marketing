// src/components/CreateTeamplate.tsx

import { useEffect, useRef, type FunctionComponent } from "react";
import { initGrapesJS } from "../../configs/GrapesJsConfig";
import CustomModal from "../../components/Modal/CustomModal";

interface CreateTeamplateProps {}

const CreateTeamplate: FunctionComponent<CreateTeamplateProps> = () => {
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
    <div className="">
      <div
        className="w-full h-full min-h-[100vh]"
        id="grapes-editor"
        ref={editorRef}
      ></div>
      <CustomModal
        isOpen={false}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
        children={<>Oke</>}
      ></CustomModal>
    </div>
  );
};

export default CreateTeamplate;
