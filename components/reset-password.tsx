'use client'

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import * as z from "zod";
import type { Database } from "@/lib/database.types";
import autoprefixer from "autoprefixer";
import Loading from "@/app/loading";
type Schema = z.infer<typeof schema>;

const schema = z.object({
    email: z.string().email({message: 'メールアドレスの形式ではありません。'})
})
const ResetPassword = async () => {
    const router = useRouter()
    const supabase = createClientComponentClient<Database>();
    const [loading, setLoading] = useState(false);
    const [message,setMessage] = useState('')
    const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: { email: "" },
		resolver: zodResolver(schema),
	});

	// 送信
	const onSubmit: SubmitHandler<Schema> = async (data) => {
		setLoading(true);
		setMessage("");

		try {
			// メールアドレス変更メールを送信
			const { error } = await supabase.auth.resetPasswordForEmail(
				data.email,
				{
					redirectTo: `${location.origin}/auth/reset-password/confirm`,
				}
			);

			// エラーチェック
			if (error) {
				setMessage("エラーが発生しました" + error.message);
				return;
			}

			setMessage("パスワードリセットメールを送信しました");
		} catch (error) {
			setMessage("エラーが発生しました" + error);
			return;
		} finally {
			setLoading(false);
			router.refresh();
		}
	};

	return (
		<div className="max-w-[400px] mx-auto">
			<div className="text-center font-bold text-xl mb-10">
				パスワードを忘れた場合
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				{/* メールアドレス */}
				<div className="mb-5">
					<div className="text-sm mb-1 font-bold">メールアドレス</div>
					<input
						type="email"
						className="border rounded-none w-full py-2 px-3 focus:outline-none focus:border-sky-500"
						placeholder="メールアドレス"
						id="email"
						{...register("email", { required: true })}
					/>
					<div className="my-3 text-center text-sm text-red-500">
						{errors.email?.message}
					</div>
				</div>
				{/* 送信ボタン */}
				<div className="mb-5">
					{loading ? (
						<Loading />
					) : (
						<button
							type="submit"
							className="font-bold bg-sky-500 hover:brightness-95 w-full rounded-full p-2 text-white text-sm"
						>
							送信
						</button>
					)}
				</div>
			</form>

			{message && (
				<div className="my-5 text-center text-red-500 mb-5">{message}</div>
			)}
		</div>
	);
};

export default ResetPassword