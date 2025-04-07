import { Typography } from "../../shared/UI/Typography";
import { BorderedLink } from "../../shared/UI/BorderedLink";

export function WarehouseNavigation() {
  
  return (
    <div className="sticky top-[47px] backdrop-blur-[6px] z-20">
      <nav className="flex justify-center items-center gap-[25px] py-[5px] border-b border-black">
        <BorderedLink to="/warehouse/orders">
          <Typography>ЗАКАЗЫ</Typography>
        </BorderedLink>
        <BorderedLink to="/warehouse/products">
          <Typography>ТОВАРЫ</Typography>
        </BorderedLink>
        <BorderedLink to="/warehouse/productsRemains">
          <Typography>ОСТАТКИ</Typography>
        </BorderedLink>
        <BorderedLink to="/warehouse/parties">
          <Typography>ПАРТИИ</Typography>
        </BorderedLink>
        <BorderedLink to="/warehouse/buyers">
          <Typography>ПОКУПАТЕЛИ</Typography>
        </BorderedLink>
      </nav>
    </div>
  );
}
