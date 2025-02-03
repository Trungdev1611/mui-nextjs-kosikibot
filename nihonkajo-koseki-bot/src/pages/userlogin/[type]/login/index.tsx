import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { login } from '@/services/admin/auth.service';
import { getUserInfo } from '@/services/user.service';
import { isAuthorizedAdmin } from '@/utils/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Button from '@/components/Button';
import React  from 'react';

const schema = yup.object().shape({
  user_code: yup.string().required('ID is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

type FormLogin = {
  user_code: string;
  password: string;
};

export default function AdminLogin() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormLogin>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormLogin> = async (data) => {
    try {
      const res = await login(data);
      const userResponse = await getUserInfo(res.data.token);
      const userData = userResponse.data;
      if (isAuthorizedAdmin(userData)) {
        localStorage.setItem('token', res.data.token);
        router.push('/admin/group');
      } else {
        alert('You do not have the necessary permissions to access this page.');
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error)
    } 
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // router.push('/admin/group');
    }
  }, [router]);

  return (
    <div className="flex flex-1 items-center justify-center h-[100vh]">
      <div className="flex flex-col items-center w-full max-w-[841px] shadow-lg sm:mx-auto border border-silver-light rounded-[5px] pt-10 pb-20 sm:pl-[97px] sm:pr-[81px] px-4 mx-4">
        <h2 className="text-gray-dark text-2xl font-bold">ログイン</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-[60px]">
          <div className="w-full flex flex-col gap-10">
            <div className="w-full">
              <div className="grid grid-cols-12 w-full items-center">
                <label className="col-span-3 font-semibold font-sm text-gray-dark">
                  ID
                </label>
                <div className="col-span-9">
                  <input
                    {...register('user_code')}
                    className="w-full border border-gray40 font-sm pt-2 pb-[9px] px-4 rounded-sm"
                    placeholder="IDを入力"
                  />
                  <p className="text-xs mt-1 text-red-600">
                    {errors.user_code?.message}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="grid grid-cols-12 w-full items-center">
                <label className="col-span-3 font-semibold font-sm text-gray-dark">
                  パスワード
                </label>
                <div className="col-span-9">
                  <input
                    {...register('password')}
                    className="w-full border border-gray40 font-sm pt-2 pb-[9px] px-4 rounded-sm"
                    placeholder="メールアドレスを入力"
                    type="password"
                  />
                  <p className="text-xs mt-1 text-red-600">
                    {errors.password?.message}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <p className="text-red-coral text-right font-semibold font-sm mt-5">
            パスワードをお忘れの場合は管理者にお問い合わせください
          </p>
          <div className="flex justify-center">
            <Button type="submit" text="ログイン" variant="primary" size="large" fullWidth className='mt-8'/>
          </div>
        </form>
      </div>
    </div>
  );
}

