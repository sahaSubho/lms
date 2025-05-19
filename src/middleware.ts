import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const pathname = url.pathname;
  const token = url.searchParams.get("token");
  const noHeader = url.searchParams.get('noheader')


  if (token) {
    const newUrl = new URL(url.origin + url.pathname); // Remove query params
    const res = NextResponse.redirect(newUrl);
    res.cookies.set("auth_token", token, { httpOnly: false, secure: false });
    if(Number(noHeader) > 0){
      res.cookies.set("no_header", "1", { httpOnly: false, secure: false });
    }
    return res;
  }

  // If pathname is already lowercase, continue with the request
  if (pathname === pathname.toLowerCase()) {
    return NextResponse.next();
  }

  // Skip paths with dynamic segments or API routes
  if (pathname.includes("[") || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Redirect to lowercase version
  const lowerCasePathname = pathname.toLowerCase();
  return NextResponse.redirect(
    new URL(lowerCasePathname + url.search, request.url)
  );
}

export const config = {
  // Apply middleware to all routes except API and dynamic routes
  matcher: "/((?!api|_next|favicon.ico|[\\[\\]]).*)",
};
