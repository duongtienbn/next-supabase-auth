import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from 'next/headers'
import { redirect } from "next/navigation"
import Profile from '@/components/profile'

import type { Database } from "@/lib/database.types"
const ProfilePage =async () => {
    const supabase = createServerComponentClient<Database>({
        cookies,
    })

    const {
        data: {session},
    } = await supabase.auth.getSession()

    //未確認場合、リダイレクト
    if(!session){
        redirect('/auth/login')
    }
    return <Profile />
}
export default ProfilePage