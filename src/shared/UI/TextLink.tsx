type TextLinkProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  newTab?: boolean
};

export const TextLink = ({ children, className = "", href = '', newTab = false }: TextLinkProps) => {
  return (
    <a href={href} target={!newTab ? '_self' : "_blank"} className={`text-black text-[13px] leading-[17px] ${className}`}>
      {children}
    </a>
  );
};
