import { createFileRoute } from '@tanstack/react-router'
import { ValidateWrapper } from '../modules/auth/components/ValidateWrapper'

export const Route = createFileRoute('/login')({
  //TODO: редирект если auth
  component: RouteComponent,
})

function RouteComponent() {
  return <ValidateWrapper/>
}
