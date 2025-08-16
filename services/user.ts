import { auth } from "@/lib/auth";
import { connectDb } from "@/lib/db";
import { User } from "@/schemas/User";
import { error } from "console";
import { cookies } from "next/headers";

type TUserProps = {
  firstName: string;
  lastName: string;
  email: string;
  image: string;
};

// export async function getUserInfo() {
//   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

//   const res = await fetch(`${baseUrl}/api/user`, {
//     method: "GET",
//   });

//   if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
//   const data = await res.json();
//   return data.data;
// }
