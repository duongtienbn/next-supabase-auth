"use client";

import Link from "next/link";
import useStore from "@/store";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createClientComponentClient, type Session } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/lib/database.types";
import { IconBell } from "./icon";
import Bell from "./bell";
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
	const supabase = createClientComponentClient<Database>();
	const [message, setMessage] = useState("初期値");
	const [date, setDate] = useState< string | undefined>()

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
	const getTime = (time?: Date) : string | undefined => {
        if (time) {
            const currentTime = new Date();
            const createdAt = new Date(time);
            const timeDiff = Number(currentTime) - Number(createdAt);
            const secondsDiff = Math.floor(timeDiff / 1000);
            const minutesDiff = Math.floor(timeDiff / (1000 * 60));
            const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
            const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const monthsDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30));
            const yearsDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30 * 12));
            if (yearsDiff > 0) {
                return `${yearsDiff == 1 ? '先月' : `${yearsDiff} 年前`}`
            } else {
                if (monthsDiff > 0) {
                    return `${monthsDiff == 1 ? '先月' : `${monthsDiff} 月前`}`
                } else {
                    if (daysDiff > 0) {
                        return `${daysDiff == 1 ? '昨日' : `${daysDiff} 日前`}`
                    } else {
                        if (hoursDiff > 0) {
                            return `${hoursDiff == 1 ? '一時間前' : `${hoursDiff} 時間前`}`
                        } else if (minutesDiff > 0) {
                            return `${minutesDiff == 1 ? '一分前' : `${minutesDiff} 分前`}`
                        } else {
                            return `${secondsDiff <= 1 ? '一秒前' : `${secondsDiff} 秒前`}`
                        }
                    }
                }
            }
        }
    }
	let dateTime = Date;
	// プロフィール(notification テーブル)が変更されたら通知を受け取る
	useEffect(() => {
		console.log("Navigation useEffect");
		supabase
			// .channel("table-db-changes")
			.channel("schema-db-changes")
			.on(
				"postgres_changes",
				{
					event: "*",
					schema: "public",
					table: "todos",
					// filter: 'id=eq.1', Lọc các thay đổi cụ thể #
					// filter: 'body=eq.hey', bang eq
					// filter: 'body=neq.bye', khong bang neq
				},
				(payload) => {
					if (payload.new && "task" in payload.new) {
						console.log(payload);
						console.log("Fetch", payload.new.text);
						setMessage(payload.new.text);
						const time = new Date(payload.new.createdAt);
						const timeString = getTime(time);
						setDate(timeString)
					}
				}
			)
			.subscribe();
	}, []);

	return (
		<header className="shadow-lg shadow-gray-100">
			<div className="py-5 container max-w-screen-sm mx-auto flex items-center justify-between">
				<Link href="/" className="font-bold text-xl cursor-pointer">
					LinkStaffChannel
				</Link>
				<div className="text-sm font-bold">
					{session ? (
						<div className="flex flex-nowrap items-center space-x-5">
							<div className="flex items-center"><Bell message={message} date={date}/></div>
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
								<div>プロフィール?</div>
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
