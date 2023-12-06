'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form' 
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import Loading from '@/app/loading'
import * as z from 'zod'
import type { Database } from '@/lib/database.types'
type Schema = z.infer<typeof schema>

const schema = z.object({
    name: z.string().min(2,{ message: '2文字以上入力する必要があります。'}),
    email: z.string().email({ message: 'メールアドバイスの形式ではありません。'}),
    password: z.string().min(6,{ message: '6文字以上入力する必要があります。'}),
})

const SignUp = () =>{
//サインアップページ
    const router = useRouter()
    const supabase = createClientComponentClient<Database>()
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        //初期値
        defaultValues: { name: '', password: '', email: ''},
        //入力値のverification
        resolver: zodResolver(schema),
    })
    
        //送信
        const onSubmit: SubmitHandler<Schema> = async (data) => {
        setLoading(true)
        console.log(data)
        try {
            //サインアップ
            const { error: errorSignUp } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
                options: {
                    emailRedirectTo: `${location.origin}/auth/callback`,
                },
            })
            
            //エラーチェック
            if(errorSignUp){
                setMessage('エラーは発生しました。'+ errorSignUp.message)
                return
            }

            //プロフィールの名前を更新
            const { error: updateError} = await supabase
            .from('profilers')
            .update({name: data.name})
            .eq('email', data.email)

            //エラーチェック
            if(updateError){
                setMessage('エラーを発生しました。' + updateError.message)
                return
            }

            //入力フォームクリア
            reset()
            setMessage('本登録用のURLを記載しましたメールを送信しました。メールをご確認の上、メール本文中のURLをクリックして、本登録を行ってください。')

        }catch (error) {
            setMessage('エラーが発生しました。' + error)
            return
        } finally{
            setLoading(false)
            router.refresh()
        }
    }

    return (
        <div className="max-w-[400px] mx-auto">
            <div className="text-center font-bold text-xl mb-10">サインアップ</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* {名前} */}
                <div className="mb-3">
                    <input type="text"
                    className='border rounded-mb w-full py-2 px-3 focus:outline-none focus:border-sky-500'
                    placeholder='名前'
                    id='name'
                    {...register('name',{required: true})} />
                </div>
                <div className="my-3 text-center text-sm text-red-500" >{errors.name?.message}</div>
                {/* メールアドバイス */}
                <div className="mb-5">
                    <input type="email"
                    className='border rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-500'
                    placeholder='メールアドバイス'
                    id='email'
                    {...register('email',{required: true})} />
                </div>
                <div className="my-3 text-center text-sm text-red-500" >{errors.email?.message}</div>
                {/* パスワード */}
                <div className="mb-5">
                    <input type="password"
                    className='border rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-500'
                    placeholder='パスワード'
                    id='password'
                    {...register('password',{required: true})} />
                </div>
                <div className="my-3 text-center text-sm text-red-500" >{errors.password?.message}</div>
                {/* サインアップボタン */}
                <div className="mb-5">
                    {loading ? (< Loading/>) : (
                        <button 
                        type='submit'
                        className='font-bold bg-sky-500 hover:brightness-95 w-full rounded-full p-2 text-white text-sm' >
                            サインアップ
                        </button>
                    )}
                </div>
            </form>
            { message && <div className='my-5 text-center text-sm text-red-500'>{message}</div>}
            <div className="text-center text-sm mb-5">
                <Link href='/auth/reset-password' className='text-gray-500 font-bold'>
                    パスワードを忘れた方はこちらです。
                </Link>
            </div>
        </div>
    )
}

export default SignUp