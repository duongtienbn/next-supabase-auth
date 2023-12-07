"use client";

import Link from "next/link";
import useStore from "@/store";
import Image from "next/image";
import { useEffect } from "react";
import type { Session } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/lib/database.types";
type ProfileType = Database["public"]["Tables"]["profiles"]["Row"];

// ナビゲーション
const Navigation = ({
	session,
	profile,
}: {
	session: Session | null;
	profile: ProfileType | null;
}) => {
	const { setUser } = useStore();

	// 状態管理にユーザー情報を保存
	// email: session ? session.user.email : "",

	useEffect(() => {
		setUser({
			id: session ? session?.user.id : "",
			name: session && profile ? profile.name : "",
			introduce: session && profile ? profile.introduce : "",
			avatar_url: session && profile ? profile.avatar_url : "",
			email: session && profile ? profile.email : "",
		});
	}, [session, setUser, profile]);

	return (
		<header className="shadow-lg shadow-gray-100">
			<div className="py-5 container max-w-screen-sm mx-auto flex items-center justify-between">
				<Link href="/" className="font-bold text-xl cursor-pointer">
					LinkStaffChannel
				</Link>
				<div className="text-sm font-bold">
					{session ? (
						<div className="flex flex-nowrap items-center space-x-5">
							<Link href="/settings/profile" className="flex items-center">
								<div className="relative w-10 h-10">
									<Image
										src={
											profile && profile.avatar_url
												? profile.avatar_url
												: "/avatar.svg"
										}
										className="rounded-full object-cover"
										alt="avatar"
										fill
									/>
								</div>
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
