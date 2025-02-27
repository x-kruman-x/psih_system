import { EditPageSettingsBar } from "@/shared/types/table/editPageSettingsBar";
import HoverBorderedEl from "@/shared/UI/HoverBorderedEl";
import { Typography } from "@/shared/UI/Text";
import { Link } from "lucide-react";

export function useConfigCardSettingsBar(pageType: EditPageSettingsBar) {
  switch (pageType) {
    case "order":
      return {
        gap: "gap-[170px]",
        linkPath: "/orders",
        leftEl: (
          <HoverBorderedEl>
            {/* <Link to=""> */}
              <Typography>CDEK</Typography>
            {/* </Link> */}
          </HoverBorderedEl>
        ),
        rightEl: (
          <HoverBorderedEl>
            {/* <Link to=""> */}
              <Typography>Почта России</Typography>
            {/* </Link> */}
          </HoverBorderedEl>
        ),
        navStyle: "absolute left-1/2 -translate-x-1/2",
      };
    case "party":
      return {
        gap: "",
        linkPath: "/parties",
        leftEl: null,
        rightEl: null,
        navStyle: "",
      };
  }
}
