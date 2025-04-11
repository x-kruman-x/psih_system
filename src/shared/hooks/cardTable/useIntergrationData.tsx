import { configTableType } from "@/shared/types/table/columnTableTypes";
import { Typography } from "@/shared/UI/Typography";

export function useIntegrationData(configTable: configTableType) {
  switch (configTable) {
    case "orderTable":
      return (
        <div className="flex gap-[33px] justify-center">
          <Typography isGray={true}>доставка - 600₽</Typography>
          <Typography isGray={true}>скидка - 500₽</Typography>
          <Typography isGray={true}>промокод - 200₽</Typography>
          <Typography isGray={true}>баллы - 200PC</Typography>
        </div>
      );
    case "partiesTable":
        return <div></div>
    case "productsTable":
        return <div></div>
    case "remainsTable":
        return <div></div>
  }
}
