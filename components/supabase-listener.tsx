import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Navigation from "./navigation";
import type { Database } from "@/lib/database.types";

//確認状態の監視　かんし
const SupabaseListener = async () => {
  const supabase = createServerComponentClient<Database>({ cookies: cookies });

  //セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession();

  //プロフィールの取得
  let profile = null;
  //セクション情報からユーザーIDを取得して、スパベースからプロフィールの情報を取得
  if (session) {
    const { data: currentProfile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();

    profile = currentProfile;

    //メールアドレスを変更した場合、プロフィールを変更
    if (currentProfile && currentProfile.email !== session.user.email) {
      const { data: updatedProfile } = await supabase
        .from("profiles")
        .update({ email: session.user.email })
        .match({ id: session.user.id })
        .select("*")
        .single();

      profile = updatedProfile;
    }
  }
  return <Navigation session={session} profile={profile} />;
};
export default SupabaseListener;
