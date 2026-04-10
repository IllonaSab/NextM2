import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function proxy(request: NextRequest) {
  console.log("request");
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  console.log("token");

  if (request.nextUrl.pathname.startsWith("/")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/")) {
    return NextResponse.redirect(new URL("/auth/dashboard", request.url));
  }
}
