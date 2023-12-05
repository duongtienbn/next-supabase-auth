"use client";

import Link from "next/link";
import type { Session } from "@supabase/auth-helpers-nextjs";

//ナビゲーション
const Navigation = ({ session }: { session: Session | null }) => {
  return (
    <header className="shadow-lg shadw-gray-100">
      <div className="py-5 container max-w-screen-sm mx-auto flex items-center justify-between">
        <Link href="/" className="front-blod text-xl cursor-pointer">
          FullStack
        </Link>
        <div className="text-sm font-blod">
          {session ? (
            <div className="flex items-center space-x-5">
              <link href="/settings/profile">
                <div>プロフィール</div>
              </link>
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
export default Navigation