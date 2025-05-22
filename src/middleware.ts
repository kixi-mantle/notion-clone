import { NextRequest, NextResponse } from "next/server";



export function middleware(request : NextRequest){
    const {pathname} = request.nextUrl;
    const userId = request.cookies.get('user_id')?.value
     if (pathname.startsWith('/signin')) {
    if (userId) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next(); // allow access to /signin if not logged in
  }
 if (!userId) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

      return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};