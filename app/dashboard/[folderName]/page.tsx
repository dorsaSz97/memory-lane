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
    folderName: string;
  };
};

// export async function generateMetadata(props: PageProps): Promise<Metadata> {
//   let urlName = props.params.urlName;
//   if (urlName.split("+")[1].includes("-")) {
//     urlName = urlName.split("-").join(" ");
//   }
//   const title = folderName[0].toUpperCase() + folderName.slice(1);
//   return { title };
// }

const FolderDetailPage = async (props: PageProps) => {
  const supabase = createClient();

  let urlName = props.params.folderName;
  console.log(urlName);
  let folderId = urlName.split("%2B")[0];
  let folderName = urlName.split("%2B")[1];

  if (folderName.includes("-")) {
    folderName = folderName.split("-").join(" ");
  }

  // user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // folders
  const { data: selectedFolders } = await supabase
    .from("folders")
    .select("*")
    .eq("user_id", user!.id)
    .eq("id", +folderId);
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
          <InfoBtn selectedFolder={selectedFolders[0]} />
          <Trashcan user={user!} />
        </div>
        {/* back button */}

        <div>
          {/* folder name */}
          <Heading
            Element={"h1"}
            title={folderName}
            className="mb-[4rem] text-[8rem] self-center text-center"
          />

          {/* images */}
          <FolderDetails
            user={user!}
            selectedFolder={selectedFolders ? selectedFolders[0] : null}
          />
        </div>
      </div>
    </main>
  );
};

export default FolderDetailPage;
