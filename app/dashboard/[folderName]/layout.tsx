import type { Metadata } from "next";

type PageProps = {
  params: {
    folderName: string;
  };
  searchParams: {
    id: string;
  };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  let urlFolderName = params.folderName;

  let folderName = urlFolderName.includes("NnAaMmEe")
    ? urlFolderName.split("NnAaMmEe").join(" ")
    : urlFolderName;

  return { title: folderName };
}
export default async function FolderDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="w-full h-full p-4 relative">{children}</main>;
}
