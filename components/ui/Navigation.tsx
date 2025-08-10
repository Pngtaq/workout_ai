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
  const { data, error } = useQuery({
    queryKey: ["user"], // unique key for caching
    queryFn: getUserInfo, // your fetch function
  });
  // if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading users</p>;
  const session = data;
  return (
    <div className="flex items-start flex-col justify-between h-screen py-6 sm:min-w-[300px] max-w-[70px] shadow-lg shadow-gray-200 rounded-2xl px-4">
      <div className="flex flex-col gap-y-10  w-full">
        <div className="flex gap-x-2 items-center ">
          <Link
            href="/"
            className="bg-violet-600 text-white font-bold p-2 rounded-md"
          >
            WA
          </Link>
          <div className="flex flex-col">
            <p className="hidden sm:inline">Workout Ai</p>
            <p className="text-[11px] gap-x-1 hidden sm:inline space-x-1">
              <span>Your state:</span>
              <span className="bg-violet-600 font-semibold text-white rounded-full py-[0.7px] px-2 hidden sm:inline">
                {session?.bmiEquivalent || "Unkown"}
              </span>
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-y-6">
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
        </div>
      </div>

      {session?.firstName ? (
        <div className="space-y-4 border-gray-200 border-t-1 pt-8 w-full text-sm tracking-wider ">
          <div className="flex items-center gap-x-4">
            <Image
              src={session.image || "/default-user.png"}
              width={40}
              height={30}
              alt="user"
              referrerPolicy="no-referrer"
              className="rounded-full border-2 border-violet-500"
            />
            <p className="hidden sm:inline">{session.firstName}</p>
          </div>
          <div>
            <form action={signOutAction}>
              <button
                type="submit"
                className="text-sm bg-violet-500 flex items-center gap-x-2 pl-1 w-full py-2 rounded-md text-white font-semibold justify-center"
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
        </div>
      ) : (
        <div className="w-full pt-10 border-t-1 border-gray-200">
          <form action={signInAction}>
            <button
              type="submit"
              className="text-sm bg-violet-500 flex items-center gap-x-2 pl-1 w-full py-2 rounded-md text-white font-semibold justify-center"
            >
              <Image
                src="/icons/exit-light.png"
                width={18}
                height={18}
                alt="Exit"
              />
              <span className="hidden sm:inline">Login</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
