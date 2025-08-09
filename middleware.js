/*import { NextResponse } from "next/server";

export function middleware(request) {
  console.log(request);

  return NextResponse.redirect(new URL("/about", request.url));
}
*/
import { auth } from "@/lib/auth";

export const middleware = auth;

// redirects user to about page
export const config = {
  matcher: ["/dashboard", "/createWorkout"],
};
