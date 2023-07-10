// URL => /dashboard/:folderName
import type { Metadata } from "next";
import Link from "next/link";
import Heading from "@/components/ui/Heading";
import FolderDetails from "./FolderDetails";
import createClient from "@/util/subpabaseClient-server";
import { redirect } from "next/navigation";
import AddBtn from "./AddBtn";
import FileUploader from "./FileUploader";
import InfoBtn from "./InfoBtn";
import DeleteBtn from "./DeleteBtn";
import Trashcan from "./Trashcan";
import { useEffect } from "react";
import RealtimeProvider from "./RealtimeProvider";

export const revalidate = 0;

type PageProps = {
  params: {
    id: string;
  };
};

// export async function generateMetadata({
//   params,
// }: PageProps): Promise<Metadata> {
//   let urlName = params.folderName;

//   let folderName = urlName.split("%2B")[1];

//   if (folderName.includes("-")) {
//     folderName = folderName.split("-").join(" ");
//   }

//   return { title: folderName };
// }

const FolderDetailPage = async (props: PageProps) => {
  const supabase = createClient();

  let fId = props.params.id;

  // user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  // folders
  const { data: selectedFolders } = await supabase
    .from("folders")
    .select("*")
    .eq("user_id", user!.id)
    .eq("id", +fId);

  if (!selectedFolders) {
    redirect("/auth");
  }

  return (
    <main className="w-full h-full p-4 relative" data-scroll-section>
      <AddBtn selectedFolder={selectedFolders[0]} />

      <div className="flex flex-col h-full w-full justify-between">
        <div className="flex justify-between items-center">
          <Link href="/dashboard" className="text-lg text-underline">
            Visit all folders
          </Link>
          <DeleteBtn selectedFolder={selectedFolders[0]} user={user!} />
        </div>
        {/* back button */}

        <div className="flex flex-col gap-16">
          {/* folder name */}
          <div className="flex items-center justify-center">
            <Heading
              Element={"h1"}
              title={selectedFolders[0].name}
              className="text-[8rem] text-center"
            />
            <InfoBtn selectedFolder={selectedFolders[0]} />
          </div>

          {/* images */}
          <div className="flex flex-col gap-6">
            <Trashcan user={user!} />
            <FolderDetails
              user={user!}
              selectedFolder={selectedFolders ? selectedFolders[0] : null}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default FolderDetailPage;
