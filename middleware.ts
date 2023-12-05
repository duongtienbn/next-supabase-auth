import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from 'next/server'

import { NextRequest } from 'next/server'
import { Database } from "./lib/database.types";

export async function middleware(req: NextRequest){
    const res = NextRequest.request();
    const supabase = createMiddlewareClient<Database>({req, res})
    await supabase.auth.getSession()
    return res
}