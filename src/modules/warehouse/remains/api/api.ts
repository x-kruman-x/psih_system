import { queryOptions } from "@tanstack/react-query";
import { instance } from "../../../../shared/API/base";

async function getOrders() {
  return instance.get(`/api/orders/`);
}