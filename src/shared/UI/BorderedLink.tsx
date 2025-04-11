import { Link, useRouterState } from "@tanstack/react-router";
import type { LinkProps } from "@tanstack/react-router";
import classNames from "classnames";

type BorderedLinkProps = {
  children: React.ReactNode;
  className?: string;
  params?: any;
  matchPath?: string;
} & Partial<LinkProps>;

export function BorderedLink({
  children,
  className = "",
  to = "",
  matchPath,
}: BorderedLinkProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const isActive = matchPath && pathname.startsWith(matchPath);

  return (
    <Link
      to={to}
      className={classNames(
        { active: isActive },
        `p-[6px] border-solid border-[1px] opacity-70 border-transparent rounded-md [&.active]:border-black hover:border-black hover:opacity-100 ${className}`,
      )}
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
