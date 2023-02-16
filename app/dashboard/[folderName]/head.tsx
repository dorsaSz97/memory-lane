export default function Head({ params }: { params: { folderName: string } }) {
  console.log(params.folderName);
  return (
    <>
      <title>MemoryLane | {params.folderName} </title>
    </>
  );
}
