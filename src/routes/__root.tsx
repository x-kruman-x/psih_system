import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  // beforeLoad: ({ context: {queryClient} }) => {console.log('проверка auth')},
  component: () => (
    <>
      {/* <div className="p-2 flex gap-2">
        <Link to='/orders' className="[&.active]:font-bold">
          orders
        </Link>{' '}
       
      </div>
      <hr /> */}
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
  notFoundComponent: () => {
    return (
      <div>
        <p>This is the notFoundComponent configured on root route</p>
        {/* <Link to="/">Start Over</Link> */}
      </div>
    )
  },
})