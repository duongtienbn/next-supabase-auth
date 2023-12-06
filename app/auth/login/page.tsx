import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Database } from "@/lib/database.types";
import Login from "@/app/components/login";

//ログインページ
const LoginPage = async () => {
    const supabase = createServerComponentClient<Database>({
        cookies,
    })

    //セッション取得して
    const {
        data:{ session },
    } = await supabase.auth.getSession()

    //認証している場合、リダイレクト
    if(session) {
        redirect('/')
    }
    return <Login/>
}
export default LoginPage