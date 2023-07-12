export default async function FolderDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="w-full h-full p-4 relative">{children}</main>;
}
