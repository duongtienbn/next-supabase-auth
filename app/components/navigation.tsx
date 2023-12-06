"use client";

import Link from "next/link";
import type { Session } from "@supabase/auth-helpers-nextjs";
import useStore from "@/store";
import Image from "next/image";
import { useEffect } from "react";
import { Database } from "@/lib/database.types";
type ProfileType = Database["public"]["Tables"]["profiles"]["Row"];

//ナビゲーション
const Navigation = ({
  session,
  profile,
}: {
  session: Session | null;
  profile: ProfileType | null;
}) => {
  const { setUser } = useStore();

  //状態管理にユーザー情報を保存
  useEffect(() => {
    setUser({
      id: session ? session.user.id :'',
      email: session ? session.user.email! : '',
      name: session && profile ? profile.name : '',
      introduce: session && profile ? profile.introduce : '',
      avata_url: session && profile ? profile.avata_url : ''
    });
  },[session, setUser, profile]);
  return (
    <header className="shadow-lg shadw-gray-100">
      <div className="py-5 container max-w-screen-sm mx-auto flex items-center justify-between">
        <Link href="/" className="front-bold text-xl cursor-pointer">
          FullStack
        </Link>
        <div className="text-sm font-bold">
          {session ? (
            <div className="flex items-center space-x-5">
              <Link href="/settings/profile">
                <div>プロフィール</div>
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-5">
              <Link href="/auth/login">ログイン</Link>
              <Link href="/auth/signup">サインアップ</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
export default Navigation;
