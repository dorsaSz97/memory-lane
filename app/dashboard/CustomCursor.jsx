"use client";

import { useContext, useEffect, useRef } from "react";
import { CursorContext } from "./CursorManager";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const { mode } = useContext(CursorContext);

  const cursorRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousemove", (e) => {
      cursorRef.current.style.transform = `translate(${
        e.clientX - cursorRef.current.clientWidth / 2
      }px, ${e.clientY - cursorRef.current.clientHeight / 2}px)`;
    });

    // return () => document.removeEventListener("mousemove");
  }, []);
  return (
    <motion.div
      ref={cursorRef}
      animate={{
        width: mode !== "normal" ? "50px" : "10px",
        height: mode !== "normal" ? "50px" : "10px",
      }}
      className={`z-[20000000000000] rounded-full absolute pointer-events-none overflow-hidden top-0 left-0 translate-y-0 translate-x-0 ${
        mode !== "normal" ? "border-2 border-black bg-transparent" : " bg-black"
      }`}
    ></motion.div>
  );
};

export default CustomCursor;
