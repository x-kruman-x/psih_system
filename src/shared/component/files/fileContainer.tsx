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

export function FileContainer({ files, orderId }: { files: FilesContainerProps[], orderId: number }) {
  // TODO: фотографии с изобраажением приходит с isImg = false
  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex flex-wrap gap-[10px] h-[370px] overflow-y-auto">
        {files.map((file) => (
          <FileCard key={file.id} isImg={file.image} url={file.url} />
        ))}
      </div>
      <UploadButton savePlace='order' orderId={orderId} />
    </div>
  );
}
