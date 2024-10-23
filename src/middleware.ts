import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const pathname = url.pathname;

  // Convert the pathname to lowercase
  const lowerCasePathname = pathname.toLowerCase();

  // If the pathname is already lowercase, continue with the request
  if (pathname === lowerCasePathname) {
    return NextResponse.next();
  }

  // If not, redirect to the lowercase version of the URL
  return NextResponse.redirect(
    new URL(lowerCasePathname + url.search, request.url)
  );
}

export const config = {
  // Apply this middleware to all routes (you can adjust the matcher as needed)
  matcher: "/:path*",
};
