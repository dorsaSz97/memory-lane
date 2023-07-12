import Link from "next/link";
import DeleteButton from "./DeleteButton";
import { SupaFolder } from "@/types";
import { User } from "@supabase/supabase-js";

const ActionsBar = ({
  currentFolder,
  user,
}: {
  currentFolder: SupaFolder;
  user: User;
}) => {
  return (
    <div className="flex justify-between items-center">
      <Link href="/dashboard" className="text-lg underline underline-offset-1">
        Visit all folders
      </Link>
      <DeleteButton currentFolder={currentFolder} user={user} />
    </div>
  );
};

export default ActionsBar;
