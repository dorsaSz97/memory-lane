"use client";

import { useState } from "react";
import FileUploader from "./FileUploader";
import { FolderType } from "@/types";

const AddBtn = ({ selectedFolder }: { selectedFolder: FolderType }) => {
  const [showFileUploader, setShowFileUploader] = useState(false);

  return (
    <div className="flex justify-center absolute top-0 right-1/2 translate-x-1/2">
      <button
        className="text-6xl"
        onClick={() => setShowFileUploader(!showFileUploader)}
      >
        +
      </button>
      {showFileUploader && (
        <FileUploader
          currentFolder={selectedFolder}
          setShowFileUploader={setShowFileUploader}
        />
      )}
    </div>
  );
};

export default AddBtn;
