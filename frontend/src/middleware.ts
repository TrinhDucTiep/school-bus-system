// Next.js request middleware
import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {

  const accessToken = request.cookies.get('accessToken')
  if (!accessToken) {
    // return NextResponse.redirect('/login')
    return Response.redirect(new URL('/login', request.url));
  }
  const role = request.cookies.get('role');
  console.log('role', role)
  if(role?.value === 'ADMIN'){
    return Response.redirect(new URL('/admin', request.url));
  } else {
    return Response.redirect(new URL('/client', request.url));
  }
}

export const config = {
  matcher: ['/admin/:path*'],
}
