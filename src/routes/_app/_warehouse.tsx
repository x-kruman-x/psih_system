import { createFileRoute, Outlet } from '@tanstack/react-router'
import { WarehouseNavigation } from '../../modules/warehouse-navigation/WarehouseNavigation'

export const Route = createFileRoute('/_app/_warehouse')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <WarehouseNavigation />
      <Outlet />
    </>
  )
}
