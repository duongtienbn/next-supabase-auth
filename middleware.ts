// import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
// import { NextResponse } from 'next/server'

// import { NextRequest } from 'next/server'
// import { Database } from "./lib/database.types";

// export async function middleware(req: NextRequest){
//     const res = NextResponse.next();
//     const supabase = createMiddlewareClient<Database>({req, res})
//     await supabase.auth.getSession()
//     return res
// }

import { authMiddleware } from "@clerk/nextjs";
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
 