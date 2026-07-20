import { NextResponse } from 'next/server';

export const config = {
	matcher: [
		"/login/:path*",
		"/signup/:path*"
	],
};

export function proxy(request){
	const accessToken = request.cookies.get('customerAccessToken')?.value;

	if (accessToken) {
		return NextResponse.redirect(new URL("/store", request.url));
	}

	return NextResponse.next();
}