import { Typography } from "../../shared/UI/Text";
import { BorderedLink } from "../../shared/UI/BorderedLink";

export function WarehouseNavigation() {
  
  return (
    <div className="sticky top-[47px] backdrop-blur-[6px] z-20">
      <nav className="flex justify-center items-center gap-[25px] py-[5px] border-b border-black">
        <BorderedLink to="/orders">
          <Typography>ЗАКАЗЫ</Typography>
        </BorderedLink>
        <BorderedLink to="/products">
          <Typography>ТОВАРЫ</Typography>
        </BorderedLink>
        <BorderedLink to="/productsRemains">
          <Typography>ОСТАТКИ</Typography>
        </BorderedLink>
        <BorderedLink to="/parties">
          <Typography>ПАРТИИ</Typography>
        </BorderedLink>
        <BorderedLink to="/buyers">
          <Typography>ПОКУПАТЕЛИ</Typography>
        </BorderedLink>
      </nav>
    </div>
  );
}
