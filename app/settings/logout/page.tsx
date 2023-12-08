import { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Logout from "@/components/logout";

const LogoutPage = async () =>{
    const supabase = createServerComponentClient<Database>({cookies,})
    
    //lay session
    const { data: { session},} = await supabase.auth.getSession()
    if(!session) {
        redirect('/auth/login')
    }

    return <Logout/>

}

export default LogoutPage;