'use client'
import React, { useState } from 'react'
import { Button, Form, FormProps, Input } from 'antd'
import LabelForm from '@/components/common/LabelForm'
import Userlogin from '../../../../../public/svg/Userlogin'
import LockIcon from '../../../../../public/svg/LockIcon'
import { ValidateStatus } from 'antd/es/form/FormItem'
export default function LoginUser() {
  const [form] = Form.useForm();
  const [validateStatus, setValidateStatus] = useState({
    username: "",
    password: ""
  });
  const userName = Form.useWatch('username', form);
  const passWord = Form.useWatch('password', form);
  const onFinish: FormProps['onFinish'] = (values) => {
    console.log("values", values);

  };

  const onFinishFailed: FormProps['onFinishFailed'] = (errorInfo) => {
    const values = errorInfo.values
    setValidateStatus({
      username: values.username ? "success" : "error",
      password: values.password ? "success" : "error",
    });
  };



  return (
    <div className='bg-[#F6F7F9] h-full w-full flex flex-col justify-center items-center relative flex-1'>
  
      <div>
        <div className='w-[436px] flex justify-center flex-col items-center'>
          <h3 className='text-txt-secondary font-semibold text-[23px]'>ログイン</h3>
          <Form layout="vertical" className='w-full login-form' 
           form={form}
          onFinish={onFinish} onFinishFailed={onFinishFailed} >
            <Form.Item name="username" label={<LabelForm label='ID' />}
              validateStatus={validateStatus.username as ValidateStatus}
              rules={[{ required: true, message: 'IDが入力されていません' }]}
            >
              <Input
                placeholder="IDを入力してください"
                prefix={<Userlogin />}
                className='!py-[12px] rounded-md' />
            </Form.Item>

            <Form.Item name="password" label={<LabelForm label='パスワード' />}
              validateStatus={validateStatus.password as ValidateStatus}
              rules={[{ required: true, message: 'パスワードが入力されていません' }]}
            >
              <Input.Password
                placeholder="パスワードを入力してください"
                className='!py-[12px] rounded-md'
                prefix={<LockIcon />}
              />
            </Form.Item>

            <div className='flex mt-14' >
              {/* notActive color disable */}
              <Button color="primary"
                variant="solid"
                className={`w-full !py-[21px] rounded-md text-base font-bold bg-azureBlue !text-white `}
                htmlType='submit'
                disabled = {(!userName || !passWord)}
              >
                ログイン
              </Button>
            </div>
          </Form>


        </div>

        <div className='self-start text-mediumGray flex flex-col gap-y-4 mt-8'>
          <p>以下の場合は、<span className='font-bold text-txt-secondary underline '>管理者にお問い合わせ</span>ください。</p>
          <p>・アカウントをお持ちでない方</p>
          <p>・パスワードを忘れた方</p>
        </div>

        <div className='text-[10px] absolute bottom-[20px]'>
          <div className='flex'>
            <div className='px-4 text-azureBlue border-r border-azureBlue'>運営会社</div>
            <div className='px-4 text-azureBlue border-r border-azureBlue'>利用規約</div>
            <div className='px-4 text-azureBlue border-r border-azureBlue'>プライバシーポリシー</div>
            <div className='px-4 text-azureBlue border-r border-azureBlue'>ログイン</div>
            <div className='px-4 text-azureBlue'>お問い合わせ</div>
          </div>

          <div className='p-8 text-txt-secondary text-[9px] text-center'>©2025 NIHON KAJO Publishing Co., Ltd.</div>
        </div>
      </div>


    </div>
  )
}
