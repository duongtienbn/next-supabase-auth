import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Database } from "@/lib/database.types";
import SignUp from '@/components/signup'

//サインアップページ
const SignupPage = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  //セッションを取得して
  const {
    data: { session },
  } = await supabase.auth.getSession();

  //認証している場合、リダイレクト
  if (session) {
    redirect("/");
  }
  return <SignUp />;
}

export default SignupPage;
