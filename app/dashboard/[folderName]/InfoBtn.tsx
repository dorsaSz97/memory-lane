"use client";
import { FolderType } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const InfoBtn = ({ selectedFolder }: { selectedFolder: FolderType }) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="flex justify-center relative font-bold mb-auto">
      <button className="text-xl" onClick={() => setShowInfo(!showInfo)}>
        !
      </button>
      {showInfo && (
        <AnimatePresence>
          <motion.div
            className="bg-primary absolute gap-8 w-fit items-center left-full bottom-full min-w-[300px] h-[200px] overflow-y-scroll p-3 rounded-[5px] shadow-2xl z-[90000]"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
          >
            <p>{selectedFolder.info ?? ""}</p>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default InfoBtn;
