import createClient from "@/util/subpabaseClient-server";
import { redirect } from "next/navigation";
import RealtimeFolders from "./components/RealtimeFolders";
import FolderForm from "./components/FolderForm";
import SignoutButton from "./components/SignoutButton";

// ::::::::::::::::::::::::::::::::::::::::::NOT WORKING
// to not cache the session and have the updated one on every request
// export const revalidate = 0;

export default async function DashboardPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // because of the middleware, the user definitely exists though
  if (!user) redirect("/auth/sign-in");

  const { data: serverFolders } = await supabase
    .from("folders")
    .select("*")
    .eq("user_id", user.id)
    .order("id", { ascending: true });

  const { data: serverImages } = await supabase
    .from("images")
    .select("*")
    .eq("user_id", user.id);

  return (
    <main className="w-full h-full">
      <RealtimeFolders
        serverFolders={serverFolders ?? []}
        serverImages={serverImages ?? []}
      >
        <FolderForm user={user} />
        <SignoutButton />
      </RealtimeFolders>
    </main>
  );
}
