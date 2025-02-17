import { useQueryClient } from "@tanstack/react-query";
import { useConfigUploadBtn } from "../../hooks/useConfigUploadBtn";
import HoverBorderedEl from "../../UI/HoverBorderedEl";
import { Text } from "../../UI/Text";
import { ordersApi } from "../../../modules/warehouse/orders/api/api";

type UploadButtonProps = {
  orderId: number;
  savePlace: "order" | "product";
}
// TODO:уведомление
export function UploadButton({savePlace, orderId}: UploadButtonProps) {
  const uploadFunc = useConfigUploadBtn(savePlace)
  const queryClient = useQueryClient()

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
        await uploadFunc(orderId, formData);
      } catch (error) {
        console.error(`Ошибка при загрузке файла ${file.name}:`, error);
      }
    });
  
    try {
      await Promise.all(uploadPromises);
      queryClient.invalidateQueries({ queryKey: ordersApi.getOrderQueryOptions(orderId.toString()).queryKey });
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
          <Text>Загрузить</Text>
        </label>
      </HoverBorderedEl>
    </div>
  );
}
