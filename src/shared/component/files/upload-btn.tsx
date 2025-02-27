import { useQueryClient } from "@tanstack/react-query";
import { useConfigUploadBtn } from "../../hooks/useConfigUploadBtn";
import HoverBorderedEl from "../../UI/HoverBorderedEl";
import { Typography } from "../../UI/Text";
import { ordersApi } from "../../../modules/warehouse/orders/api/api";
import { savePlaceType } from "@/shared/types/uploadSavePlaceTypes";

type UploadButtonProps = {
  id: number;
  savePlace: savePlaceType;
}
// TODO:уведомление
export function UploadButton({savePlace, id}: UploadButtonProps) {
  const {uploadFunc, refreshPageFunc} = useConfigUploadBtn(savePlace)

  if (!uploadFunc) {
    console.error(`Неизвестный тип сохранения: ${savePlace}`);
    return <div>Неверный тип сохранения</div>;
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const filesList = event.target.files;
  
    if (!filesList || filesList.length === 0) {
      alert("Файлы не выбраны");
      return;
    }
  
    const filesArr = Array.from(filesList);
  
    const uploadPromises = filesArr.map(async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
  
      try {
        await uploadFunc(id, formData);
      } catch (error) {
        console.error(`Ошибка при загрузке файла ${file.name}:`, error);
      }
    });
  
    try {
      await Promise.all(uploadPromises);
      console.log('обновляю страницу')
      await refreshPageFunc
    } catch (error) {
      console.error("Произошла ошибка при загрузке некоторых файлов:", error);
    }
  };
  return (
    <div className="flex justify-center">
      <input
        type="file"
        id="fileInput"
        className="hidden"
        multiple
        onChange={handleFileChange}
      />
      <HoverBorderedEl className="cursor-pointer">
        <label
          className="cursor-pointer"
          htmlFor="fileInput"
        >
          <Typography>Загрузить</Typography>
        </label>
      </HoverBorderedEl>
    </div>
  );
}
