import { savePlaceType } from "@/shared/types/savePlaceTypes";
import { FileCard } from "./fileCard";
import { UploadButton } from "./upload-btn";

type FilesContainerProps = {
  id: number;
  url: string;
  image: boolean;
  size: string | null;
  user: object | null;
  created_at: string | null;
};

export function FileContainer({ files, id, savePlace }: { files: FilesContainerProps[], id: number, savePlace: savePlaceType }) {
  // TODO: фотографии с изображением приходит с isImg = false
  return (
    <div className="flex flex-col justify-between gap-[20px]">
      <div className="flex flex-wrap gap-[10px] max-h-[370px] overflow-y-auto">
        {files.map((file) => (
          <FileCard key={file.id} isImg={file.image} url={file.url} />
        ))}
      </div>
      <UploadButton savePlace={savePlace} id={id} />
    </div>
  );
}
