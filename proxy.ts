import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/account"];
const authRoutes = ["/auth/login", "/auth/register"];

async function getMe(token: string): Promise<boolean> {
  try {
    const response = await fetch("http://localhost:1337/api/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.ok;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Routes protégées — vérifier le token
  if (isProtected) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    const isValid = await getMe(token);
    if (!isValid) {
      const response = NextResponse.redirect(
        new URL("/auth/login", request.url),
      );
      response.cookies.delete("token");
      return response;
    }
  }

  // Déjà connecté — pas besoin d'aller sur login/register
  if (isAuthRoute && token) {
    const isValid = await getMe(token);
    if (isValid) {
      return NextResponse.redirect(new URL("/account/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/auth/:path*"],
};
