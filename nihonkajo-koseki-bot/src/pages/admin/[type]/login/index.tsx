import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { login } from '@/services/admin/auth.service';
import { getUserInfo } from '@/services/user.service';
import { getRole, typeRoute } from '@/utils/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Button from '@/components/Button';
import { maxAge } from '@/utils/helpers';
import { getCookie, setCookie } from 'cookies-next';
import UserIcon from '@/components/icons/UserIcon';
import LockIcon from '@/components/icons/LockIcon';
import { AlertIcon } from '@/components/icons';
import InputFieldAuth from '@/components/InputFieldAuth';
import { getVendors } from '@/services/vendor.service';
import React from 'react'
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
  const [errorMessage, setErrorMessage] = useState<any>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormLogin>({
    resolver: yupResolver(schema),
  });

  const user_code = watch('user_code');
  const password = watch('password');

  const isSubmitDisabled = !user_code || !password;

  const onSubmit: SubmitHandler<FormLogin> = async (data) => {
    try {
      const res = await login(data);
      const token = res.data.token;
      const userResponse = await getUserInfo(token);
      const userData = userResponse.data;
      const expToken = maxAge(token);
      setCookie(
        'o_token',
        { token, role: getRole(userData) },
        { maxAge: expToken },
      );
      setCookie("userInfo", { userInfo: userData }, { maxAge: expToken })
      await saveVendorInfo();
      router.push(`/admin/${typeRoute()}/group`);
    } catch (error: any) {
      if (error.status == 401) {
        setErrorMessage('IDかパスワードが違うためログインできませんでした');
      }
    } finally {
    }
  };

  const saveVendorInfo = async () => {
    const type = typeRoute();
    try {
      const vendorInfo = getCookie(`vendor_${type}`);
      if (!vendorInfo) {
        const body = {
          use_display_id: true,
          page: 1,
          per_page: 0,
          return_number_value: true,
          conditions: [
            {
              id: 'tag_name',
              search_value: [type],
            },
          ],
        };
        const res = await getVendors(body);
        setCookie(`vendor_${type}`, res?.data?.items[0]);
      }
    } catch (error) {
      console.log('saveVendorInfo error: ', error);
    }
  };

  useEffect(() => { }, [router]);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50">
      <div className="flex-grow flex flex-col items-center justify-center">
        <div className="max-w-md w-full p-[6px]">
          <h1 className="text-[32px] font-semibold text-center text-txt-secondary mb-14">
            ログイン for Admin
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputFieldAuth
              label="ID"
              type="text"
              placeholder="IDを入力してください"
              LeftIcon={UserIcon}
              register={register('user_code')}
              error={errors.user_code}
            />
            <InputFieldAuth
              label="パスワード"
              type="password"
              placeholder="パスワードを入力してください"
              LeftIcon={LockIcon}
              register={register('password')}
              error={errors.password}
            />
            {errorMessage ? (
              <div className="flex items-center gap-2 text-txt-error text-sm font-medium p-4 border-2 mt-14 rounded border-txt-error bg-[#FFF1F1]">
                <AlertIcon />
                {errorMessage}
              </div>
            ) : null}
            <Button
              type="submit"
              text="ログイン"
              variant="primary"
              size="large"
              fullWidth
              disabled={isSubmitDisabled}
              className="mt-14"
            />
          </form>
          <div className="text-xs text-mediumGray mt-8">
            以下の場合は、
            <a href="#" className="text-azureBlue font-bold">
              管理者にお問い合わせ
            </a>
            ください。
            <ul className="mt-2">
              <li>
                <span className="mx-2">•</span>アカウントをお持ちでない方
              </li>
              <li>
                <span className="mx-2">•</span>パスワードを忘れた方
              </li>
            </ul>
          </div>
        </div>
      </div>
      <footer className="text-sm text-gray-400 mt-8 text-center py-4">
        Copyright © 2024 Koseki AI All rights reserved.
      </footer>
    </div>
  );
}
