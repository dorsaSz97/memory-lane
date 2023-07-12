"use client";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { SupaFolder } from "@/types";
import ImageForm from "./ImageForm";

const FileUploader = ({ currentFolder }: { currentFolder: SupaFolder }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="fixed flex justify-center top-0 right-1/2 translate-x-1/2 z-[20]">
      {/* the condition should be inside the animatepresence for the exit animation to work */}
      <AnimatePresence>
        {showForm && (
          <ImageForm currentFolder={currentFolder} setShowForm={setShowForm} />
        )}
      </AnimatePresence>
      <button className="text-6xl" onClick={() => setShowForm(!showForm)}>
        +
      </button>
    </div>
  );
};

export default FileUploader;
