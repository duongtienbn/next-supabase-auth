import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { Database } from "@/lib/database.types";

//サインアップ後のリダイレクト先
export async function GET(request: NextRequest){
    //URL取得して
    const requestUrl = new URL(request.url)

    //承認コード取得して
    const code = requestUrl.searchParams.get('code')
    if(code) {
        const supabase = createRouteHandlerClient<Database>({cookies})

        //認証コードをセッションに交換
        await supabase.auth.exchangeCodeForSession(code)
    }
    return NextResponse.redirect(requestUrl.origin)
} 