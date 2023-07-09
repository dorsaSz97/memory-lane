"use client";
import { FolderType } from "@/types";
import supabase from "@/util/subpabaseClient-browser";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const DeleteBtn = ({
  selectedFolder,
  user,
}: {
  selectedFolder: FolderType;
  user: User;
}) => {
  const router = useRouter();
  const deleteFolder = async () => {
    // loading

    const { error: imgError } = await supabase
      .from("images")
      .delete()
      .eq("folder_id", selectedFolder.id)
      .eq("user_id", user.id);

    const { error } = await supabase
      .from("folders")
      .delete()
      .eq("id", selectedFolder.id)
      .eq("user_id", user.id);

    router.push("/dashboard");
  };

  return <button onClick={() => deleteFolder()}>Delete</button>;
};

export default DeleteBtn;
