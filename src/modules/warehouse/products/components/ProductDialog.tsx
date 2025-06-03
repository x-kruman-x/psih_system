import { BorderedElement } from "@/shared/UI/BorderedElement";
import { Typography } from "@/shared/UI/Typography";
import { useEffect, useState } from "react";
import { useUploadProductImg } from "../hooks/use-upload-product-img";

type ProductDialogProps = {
  onClose: () => void;
  productId: number;
};

export const ProductDialog = ({ productId, onClose }: ProductDialogProps) => {
  const [uploadImg, setUploadImg] = useState<File[]>();
  const { handleUploadProductImg, updateProductPage } = useUploadProductImg();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const imageFiles = Array.from(files).filter((file) =>
        file.type.startsWith("image/")
      );
      setUploadImg(imageFiles);
      console.log("Выбранные изображения:", imageFiles);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = uploadImg?.filter((_, i) => i !== index);
    setUploadImg(updatedImages);
  };

  const handleUpload = async () => {
    if (!uploadImg) return;

    await Promise.all(
      uploadImg.map((file) => handleUploadProductImg({ productId, file }))
    );
  };

  useEffect(() => {
    return () => {
      uploadImg?.forEach((img) =>
        URL.revokeObjectURL(URL.createObjectURL(img))
      );
    };
  }, [uploadImg]);

  return (
    <div className="fixed left-1/2 top-1/2 w-[90vw] max-w-[1600px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white border border-black border-solid z-10">
      <div className="border-b border-solid border-black flex items-center px-4 py-2 relative">
        <button className="border border-solid border-black rounded-md p-[6px]">
          <Typography onClick={onClose}>Закрыть</Typography>
        </button>
        <Typography className="absolute left-1/2 -translate-x-1/2">
          ЗАГРУЗИТЕ ВСЕ ФОТО
        </Typography>
      </div>
      <div className="min-h-[500px] flex flex-col">
        {uploadImg === undefined || uploadImg.length === 0 ? (
          <div className="flex flex-grow justify-center items-center">
            <label className="px-4 py-2 cursor-pointer">
              <Typography>Загрузить изображения</Typography>
              <input
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={handleFileChange}
              />
            </label>
          </div>
        ) : (
          <div className="flex flex-wrap">
            {uploadImg.map((img, index) => (
              <div
                key={img.lastModified}
                className="w-[299px] h-[299px] relative"
              >
                <button
                  className="absolute right-0 top-0 bg-white"
                  onClick={() => handleRemoveImage(index)}
                >
                  X
                </button>
                <img
                  src={URL.createObjectURL(img)}
                  alt="preview"
                  className="w-full h-full"
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mb-2 flex justify-center">
        <BorderedElement
          as="button"
          className="!px-2"
          onClick={async () => {
            await handleUpload();
            updateProductPage(productId);
            onClose();
          }}
        >
          ПРИНЯТЬ
        </BorderedElement>
      </div>
    </div>
  );
};
