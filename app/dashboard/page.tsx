import type { Metadata } from "next";
import createClient from "@/util/subpabaseClient-server";
import SignoutButton from "./SignoutButton";
import FolderForm from "./FolderForm";
import FoldersList from "./FoldersList";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  // wilthe user will 100% exist because of the middleware

  const { data: userFolders } = await supabase
    .from("folders")
    .select("*")
    .eq("user_id", user!.id);

  return (
    <main className="w-full h-full px-36">
      <FoldersList userFolders={userFolders ?? []} user={user!} />

      <FolderForm user={user!} />
      <SignoutButton />
    </main>
  );
}
