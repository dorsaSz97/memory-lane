"use client";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import supabase from "@/util/subpabaseClient-browser";
import { User } from "@supabase/supabase-js";
import { CursorContext } from "@/components/ui/CursorManager";
import { SupaFolder } from "@/types";
import { revalidatePath } from "next/cache";

const DeleteButton = ({
  currentFolder,
  user,
}: {
  currentFolder: SupaFolder;
  user: User;
}) => {
  const { setMode } = useContext(CursorContext);
  const router = useRouter();
  console.log(currentFolder);

  const deleteHandler = async () => {
    setMode("normal");

    const { error: imgError } = await supabase
      .from("images")
      .delete()
      .eq("folder_id", currentFolder.id)
      .eq("user_id", user.id);

    // already set the cascade action in the supabase so that its related data gets deleted as well
    const { error } = await supabase
      .from("folders")
      .delete()
      .eq("id", currentFolder.id)
      .eq("user_id", user.id);

    router.push("/dashboard");
  };

  return (
    <button
      className="text-red-700"
      onClick={deleteHandler}
      onMouseEnter={() => setMode("")}
      onMouseLeave={() => setMode("normal")}
    >
      Delete this folder
    </button>
  );
};

export default DeleteButton;
