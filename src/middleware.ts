import { NextRequest, NextResponse } from "next/server";

const privatePaths = ["/me"];
const authPaths = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("sessionToken")?.value;

  // Chưa đăng nhập thì không cho vào privatePaths
  if (privatePaths.includes(pathname) && !sessionToken) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Đã đăng nhập thì không cho vào authPaths
  if (authPaths.includes(pathname) && sessionToken) {
    const homeUrl = new URL("/me", request.url);
    return NextResponse.redirect(homeUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/me", "/login", "/register"],
};
