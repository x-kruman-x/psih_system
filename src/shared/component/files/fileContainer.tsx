import { FileCard } from "./fileCard";

type FilesContainerProps = {
  id: number;
  url: string;
  image: boolean;
  size: string | null;
  user: object | null;
  created_at: string | null;
};

export function FileContainer({ files }: { files: FilesContainerProps[] }) {
  return (
    <div className="flex flex-wrap gap-[10px] h-[370px] overflow-y-auto">
      {files.map((file) => (
        <FileCard isImg={file.image} url={file.url} />
      ))}
    </div>
  );
}
