"use server"; // implicit
import { auth, signIn, signOut } from "./auth";
//NOTE: the signIn and signOut should be from the function that you created. auth.ts!!

export async function signInAction() {
  // you cann use a dynamic to loop all the provider"
  await signIn("google", { redirectTo: "/dashboard" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function authAction() {
  const session = await auth();
  return session;
}
