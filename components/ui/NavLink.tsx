import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

interface NavLinkProps {
  href: string;
  icon: string;
  isActive: boolean;
  children: ReactNode;
}

const NavLink = ({ href, icon, children, isActive }: NavLinkProps) => {
  return (
    <Link
      href={href}
      className={`flex items-center space-x-4 py-2 rounded-md px-2 ${
        isActive
          ? "bg-violet-500 text-white font-bold "
          : "transition-all duration-300 ease-in-out hover:bg-violet-50"
      }`}
    >
      <Image src={icon} width={20} height={20} alt={href} className="" />
      <p className="text-sm tracking-wider hidden sm:inline">{children}</p>
    </Link>
  );
};

export default NavLink;
