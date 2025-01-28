import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_app')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
      <div>
        навигация по приложению
        <Outlet />
      </div>
    );
}
