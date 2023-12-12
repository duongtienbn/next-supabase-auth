"use client";

import React, { useState } from "react";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

import useScroll from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const Header = () => {
	const scrolled = useScroll(5);
	const selectedLayout = useSelectedLayoutSegment();
	const [message, setMessage] = useState("初期値");

	const channelA = supabase
		.channel("schema-db-changes")
		.on(
			"postgres_changes",
			{
				event: "*",
				schema: "public",
				table: "notifications",
			},
			(payload) => {
				console.log(payload);
				if (payload.new && "message" in payload.new) {
					setMessage(payload.new.message);
				}
			}
		)
		.subscribe();

	return (
		<div
			className={cn(
				`sticky inset-x-0 top-0 z-30 w-full transition-all border-b border-gray-200`,
				{
					"border-b border-gray-200 bg-white/75 backdrop-blur-lg":
						scrolled,
					"border-b border-gray-200 bg-white": selectedLayout,
				}
			)}
		>
			<div className="flex h-[47px] items-center justify-between px-4">
				<div className="flex items-center space-x-4">
					<Link
						href="/"
						className="flex flex-row space-x-3 items-center justify-center md:hidden"
					>
						<span className="h-7 w-7 bg-zinc-300 rounded-lg" />
						<span className="font-bold text-xl flex ">Logo</span>
					</Link>
				</div>
				{/* <div className="hidden md:block"> */}
				<div className="hidden md:flex">
					<div className="h-8 w-50 rounded-full bg-zinc-300 flex items-center justify-center text-center">
						{/* {message} */}
						{/* <span className="font-semibold text-sm">
							<Icon icon="mdi:bell-outline" width="24" height="24" />
						</span> */}
					</div>
					<div className="h-8 w-8 rounded-full bg-zinc-300 flex items-center justify-center text-center">
						<span className="font-semibold text-sm">HQ</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;