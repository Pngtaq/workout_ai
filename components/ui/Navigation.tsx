"use client";

import { signInAction, signOutAction } from "@/lib/action";
import Image from "next/image";
import Link from "next/link";
import { navData } from "@/data/navData";
import NavLink from "./NavLink";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/services/user";

export default function Navigation() {
  const pathName = usePathname();
  const { data: user, error } = useQuery({
    queryKey: ["user"],
    queryFn: getUserInfo,
  });

  if (error) return <p>Error loading user</p>;

  return (
    <aside
      className="
        sticky top-0 
        flex flex-col justify-between 
        h-screen 
        py-6 px-4
        bg-white 
        shadow-lg shadow-gray-200
        rounded-2xl
        w-[70px] sm:w-[300px] 
        transition-all duration-300
        z-50
      "
    >
      {/* Top Section */}
      <div className="flex flex-col gap-y-10 w-full">
        {/* Logo */}
        <div className="flex gap-x-2 items-center">
          <Link
            href="/"
            className="bg-violet-600 text-white font-bold p-2 rounded-md flex-shrink-0"
          >
            WA
          </Link>
          <div className="hidden sm:flex flex-col">
            <p className="font-medium">Workout Ai</p>
            <p className="text-[11px] mt-0.5">
              <span>Your state:</span>{" "}
              <span className="bg-violet-600 font-semibold text-white rounded-full px-2 py-[1px]">
                {user?.bmiEquivalent || "Unknown"}
              </span>
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-y-6">
          {navData.map((curr) => (
            <NavLink
              key={curr.href}
              href={curr.href}
              icon={pathName === curr.href ? curr.iconLight : curr.iconDark}
              isActive={pathName === curr.href}
            >
              {curr.title}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom Section */}
      {user?.firstName ? (
        <div className="border-t border-gray-200 pt-6 w-full text-sm">
          <div className="flex items-center gap-x-4 mb-4">
            <Image
              src={user.image || "/icons/user-dark.png"}
              width={40}
              height={40}
              alt="user"
              referrerPolicy="no-referrer"
              className="rounded-full border-2 border-violet-500"
            />
            <p className="hidden sm:inline">{user.firstName}</p>
          </div>
          <form action={signOutAction}>
            <button
              type="submit"
              className="text-sm bg-violet-500 flex items-center gap-x-2 w-full py-2 rounded-md text-white font-semibold justify-center hover:bg-violet-600 transition-colors"
            >
              <Image
                src="/icons/exit-light.png"
                width={18}
                height={18}
                alt="Exit"
                className="-rotate-180"
              />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </form>
        </div>
      ) : (
        <div className="w-full pt-6 border-t border-gray-200">
          <form action={signInAction}>
            <button
              type="submit"
              className="text-sm bg-violet-500 flex items-center gap-x-2 w-full py-2 rounded-md text-white font-semibold justify-center hover:bg-violet-600 transition-colors"
            >
              <Image
                src="/icons/exit-light.png"
                width={18}
                height={18}
                alt="Login"
              />
              <span className="hidden sm:inline">Login</span>
            </button>
          </form>
        </div>
      )}
    </aside>
  );
}
