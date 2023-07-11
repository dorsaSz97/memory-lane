"use client";
import { SupaFolder } from "@/types";
import supabase from "@/util/subpabaseClient-browser";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const InfoBtn = ({ selectedFolder }: { selectedFolder: SupaFolder }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [info, setInfo] = useState(selectedFolder.info ?? "");
  const [edit, setEdit] = useState(false);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const updateText = async () => {
      setInfo(paragraphRef.current!.textContent ?? "");
      const { error } = await supabase
        .from("folders")
        .update({ info: paragraphRef.current!.textContent })
        .eq("id", selectedFolder.id)
        .eq("user_id", selectedFolder.user_id);
    };
    if (paragraphRef.current) updateText();
  }, [paragraphRef.current?.textContent]);

  return (
    <div className="flex justify-center relative font-bold mb-auto ">
      <button className="text-xl" onClick={() => setShowInfo(!showInfo)}>
        !
      </button>
      {showInfo && (
        <AnimatePresence>
          <motion.div
            className="bg-primary absolute gap-8 w-fit items-center flex flex-col left-[110%] bottom-1/2 min-w-[300px] h-[200px]  overflow-y-scroll scrollbar-hidden p-3 rounded-[5px] shadow-2xl z-[89999]"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
          >
            <p
              className={`flex-1 w-full ${edit ? "border-2 border-black" : ""}`}
              contentEditable={edit}
              ref={paragraphRef}
              onChange={() => setInfo(paragraphRef.current?.textContent ?? "")}
            >
              {info}
            </p>
            <button onClick={() => setEdit(!edit)}>
              {edit ? "Done" : "Edit"}
            </button>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default InfoBtn;
