"use client";
import { CursorContext } from "@/components/ui/CursorManager";
import DeleteButton from "./DeleteButton";
import { SupaFolder } from "@/types";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useContext } from "react";

const ActionsBar = ({
  currentFolder,
  user,
}: {
  currentFolder: SupaFolder;
  user: User;
}) => {
  const router = useRouter();
  const { setMode } = useContext(CursorContext);
  return (
    <div className="flex justify-between items-center">
      <button
        onMouseEnter={() => setMode("")}
        onMouseLeave={() => setMode("normal")}
        // ::::::::::::::::::::::::::::::::::::::::::NOT WORKING
        onClick={() => {
          setMode("normal");
          router.push("/dashboard");
          router.refresh();
        }}
        // ::::::::::::::::::::::::::::::::::::::::::NOT WORKING
        // href="/dashboard"
        className="text-lg underline underline-offset-1"
      >
        Visit all folders
      </button>
      <DeleteButton currentFolder={currentFolder} user={user} />
    </div>
  );
};

export default ActionsBar;
