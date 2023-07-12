// URL => /dashboard/:folderName
import { redirect } from "next/navigation";
import createClient from "@/util/subpabaseClient-server";
import Heading from "@/components/ui/Heading";
import RealtimeImages from "./RealtimeImages";
import TrashButton from "./TrashButton";
import ActionsBar from "./ActionsBar";
import InfoButton from "./InfoButton";
import FileUploader from "./FileUploader";

export const revalidate = 0;

type PageProps = {
  params: {
    folderName: string;
  };
  searchParams: {
    id: string;
  };
};

const FolderDetailPage = async (props: PageProps) => {
  let folderId = props.searchParams.id;

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/sign-in");

  const { data: selectedFolders } = await supabase
    .from("folders")
    .select("*")
    .eq("user_id", user.id)
    .eq("id", +folderId);

  if (!selectedFolders || !selectedFolders[0]) {
    return <p>This folder you are looking for doesnt exist</p>;
  }

  const { data: serverImages } = await supabase
    .from("images")
    .select("*")
    .eq("user_id", user.id)
    .eq("folder_id", selectedFolders[0].id);

  return (
    <>
      <FileUploader currentFolder={selectedFolders[0]} />
      <div className="flex flex-col h-full w-full justify-between gap-4">
        <ActionsBar currentFolder={selectedFolders[0]} user={user} />
        <div className="flex flex-col justify-between gap-16">
          <div className="flex items-center justify-center">
            <Heading
              Element={"h1"}
              title={selectedFolders[0].name}
              className="text-8xl text-center"
            />
            <InfoButton selectedFolder={selectedFolders[0]} />
          </div>

          <div className="flex flex-col justify-between gap-6">
            <TrashButton user={user} />
            <div className="mt-auto overflow-x-scroll scrollbar-hidden">
              <RealtimeImages serverImages={serverImages ?? []} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FolderDetailPage;
