import { CategoriesTypes } from "@/shared/types/categoriesTypes";
import HoverBorderedEl from "@/shared/UI/HoverBorderedEl";
import { Typography } from "@/shared/UI/Text";

export function CategoriesButton(categoriesData?: CategoriesTypes) {
    if (!categoriesData || categoriesData.length === 0) {
      return <Typography>Нет категорий</Typography>;
    }
  
    return (
      <>
        {categoriesData.map((category) => (
          <HoverBorderedEl key={category.id}>
            <Typography>{category.name}</Typography>
          </HoverBorderedEl>
        ))}
      </>
    );
  }