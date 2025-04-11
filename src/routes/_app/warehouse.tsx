import { createFileRoute, Outlet } from '@tanstack/react-router'
import { WarehouseNavigation } from '@/modules/warehouse-navigation/WarehouseNavigation.tsx'

export const Route = createFileRoute('/_app/warehouse')({
  component: RouteComponent,
})

function RouteComponent() {
  console.log('Layout loaded')
  return (
    <>
      <WarehouseNavigation />
      <Outlet />
    </>
  )
}
