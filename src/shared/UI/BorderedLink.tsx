import { Link } from "@tanstack/react-router";
import type { LinkProps } from "@tanstack/react-router";

type BorderedLinkProps = {
  children: React.ReactNode;
  className?: string;
} & Partial<LinkProps>;

export function BorderedLink({
  children,
  className = "",
  to = "",
}: BorderedLinkProps) {
  return (
    <Link
      to={to}
      className={`p-[6px] border-solid border-[1px] opacity-70 border-transparent rounded-md [&.active]:border-black hover:border-black hover:opacity-100 ${className}`}
    //   activeProps={{
    //     style: {
    //         border: 'black',
    //     },
    //   }}
    >
      {children}
    </Link>
  );
}