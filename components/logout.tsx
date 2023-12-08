'use client'

import Loading from "@/app/loading";
import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const Logout = () => {
    const router = useRouter();
    const supabase = createClientComponentClient<Database>();
    const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");

    const onSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try{
            const { error } = await supabase.auth.signOut()
            if (error){
                setMessage('エラーが発生しました。'+ error.message)
                return
            }
            router.push('/')
            router.refresh()
        } catch (error){
            setMessage('エラーが発生しました。'+ error);
            return
        }finally{
            setLoading(false);
            setMessage('')
        }
    }
return (
		<div>
			{/* ログアウトボタン */}
			<form onSubmit={onSubmit}>
				<div className="mb-5">
					{loading ? (
						<Loading />
					) : (
						<button
							type="submit"
							className="font-bold bg-red-500 hover:brightness-95 w-full rounded-full p-2 text-white text-sm"
						>
							ログアウト
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

export default Logout;