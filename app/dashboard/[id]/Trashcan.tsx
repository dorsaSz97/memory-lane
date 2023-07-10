"use client";
import supabase from "@/util/subpabaseClient-browser";
import { User } from "@supabase/supabase-js";
import { DragEvent } from "react";
import { TfiTrash } from "react-icons/tfi";

const Trashcan = ({ user }: { user: User }) => {
  const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const dropHandler = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text");
    const { error } = await supabase
      .from("images")
      .delete()
      .eq("id", +id)
      .eq("user_id", user.id);
  };

  return (
    <div onDragOver={dragOverHandler} onDrop={dropHandler}>
      <TfiTrash size={30} />
    </div>
  );
};

export default Trashcan;
