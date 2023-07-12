"use client";
import { DragEvent } from "react";
import supabase from "@/util/subpabaseClient-browser";
import { User } from "@supabase/supabase-js";
import { TfiTrash } from "react-icons/tfi";

const TrashButton = ({ user }: { user: User }) => {
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
    <div className="w-fit" onDragOver={dragOverHandler} onDrop={dropHandler}>
      <TfiTrash size={30} />
    </div>
  );
};

export default TrashButton;
