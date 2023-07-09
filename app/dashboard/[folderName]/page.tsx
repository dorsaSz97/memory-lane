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

type PageProps = {
  params: {
    folderName: string;
  };
};

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  let folderName = props.params.folderName;
  if (folderName.includes("-")) {
    folderName = folderName.split("-").join(" ");
  }
  const title = folderName[0].toUpperCase() + folderName.slice(1);
  return { title };
}

const FolderDetailPage = async (props: PageProps) => {
  const supabase = createClient();

  let folderName = props.params.folderName;
  if (folderName.includes("-")) {
    folderName = folderName.split("-").join(" ");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  const { data: selectedFolder } = await supabase
    .from("folders")
    .select("*")
    .eq("user_id", user.id)
    .eq("name", folderName);

  if (!selectedFolder) {
    redirect("/auth");
  }

  return (
    <main className="w-full h-full p-4 relative" data-scroll-section>
      <AddBtn selectedFolder={selectedFolder[0]} />

      <div className="flex flex-col h-full w-full justify-between">
        <div className="flex justify-between items-center">
          <Link href="/dashboard" className="text-lg text-underline">
            Visit all folders
          </Link>
          <DeleteBtn selectedFolder={selectedFolder[0]} user={user} />
          <InfoBtn selectedFolder={selectedFolder[0]} />
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
            user={user}
            selectedFolder={selectedFolder ? selectedFolder[0] : null}
          />
        </div>
      </div>
    </main>
  );
};

export default FolderDetailPage;
