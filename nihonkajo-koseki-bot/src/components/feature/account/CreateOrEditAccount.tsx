import React, { useState } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import { routeNames } from '@/pages/admin/[type]/group'
import FormField from '@/components/FormField';
import { typeRoute } from '@/utils/auth';
import InputField from '@/components/InputField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AccountSchema } from '@/utils/schema';
import SelectField from '@/components/SelectField';
import TextareaField from '@/components/TextareaField';
import ErrorField from '@/components/common/ErrorField';
import { AccountData } from '@/interfaces/accountType';
import LayoutAdmin from '../layout/LayoutAccount';
import ButtonGroupFooter from '@/components/ButtonGroupFooter';
import { SelectChangeEvent } from '@mui/material';

export default function CreateOrEditAccount() {
  const [value, setValueSelect] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<AccountData>({
    //@ts-expect-error(version conflict type)
    resolver: yupResolver(AccountSchema)
  });

  function onSubmit(valueData: AccountData) {
    console.log("valueData", valueData)
  }



  return (
    <LayoutAdmin>
      <div className="flex flex-1 min-h-full flex-col justify-between ">
        <div className="px-5 pt-5">
          <Breadcrumb routeNames={routeNames} />

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 px-5 py-9"
          >
            <div>
              <FormField label="ベンダー名">
                <p className="font-light text-sm uppercase px-[10px] py-[14px]">
                  {typeRoute()}
                </p>
              </FormField>
            </div>

            <div className=" w-formShort">
              <FormField label="権限" required>
                <div className="w-full">
                  <InputField
                    type="text"
                    placeholder="入力してください"
                    register={register('authority')}
                  />
                  <ErrorField errors={errors} name='authority' />
                </div>
              </FormField>
            </div>

            <div className="w-full">
              <FormField label="ログインID" required>
                <div className="w-full">
                  <InputField
                    type="text"
                    placeholder="入力してください"
                    register={register('loginId')}
                  />
                  <ErrorField errors={errors} name='loginId' />

                </div>
              </FormField>
            </div>

            <div className="w-full">
              <FormField label="パスワード" required>
                <div className="w-full">
                  <InputField
                    type="password"
                    placeholder="入力してください（英大文字・英小文字・数字それぞれを最低1文字ずつ含み8文字以上にしてください）"
                    register={register('password')}
                  />
                  <ErrorField errors={errors} name='password' />

                </div>
              </FormField>
            </div>

            <div className="w-full">
              <FormField label="パスワード（確認）" required>
                <div className="w-full">
                  <InputField
                    type="password"
                    placeholder="入力してください（英大文字・英小文字・数字それぞれを最低1文字ずつ含み8文字以上にしてください）"
                    register={register('password_confirm')}
                  />
                  <ErrorField errors={errors} name='password_confirm' />
                </div>
              </FormField>
            </div>

            <div className="w-formShort">
              <FormField label="所属組織" required>
                <div className="w-full">
                  <SelectField options={[{label: "test", value: "1"}]} value= {value} placeholder='選択してください' onChange={(e:SelectChangeEvent) => {
                   setValue("organization",e.target.value)
                   setValueSelect(e.target.value)
                  }}
                    
                    />
                  <ErrorField errors={errors} name='organization' />
                </div>
              </FormField>
            </div>

            <div className="w-full">
              <FormField label="名前" required>
                <div className="w-full">
                  <InputField
                    type="name"
                    placeholder="入力してください"
                    register={register('name')}
                  />
                  <ErrorField errors={errors} name='name' />
                </div>
              </FormField>
            </div>

            <div className="w-full">
              <FormField label="部門名">
                <div className="w-full">
                  <InputField
                    type="departmentName"
                    placeholder="入力してください"
                    register={register('departmentName')}
                  />
                </div>
              </FormField>
            </div>

            <div className="w-full">
              <FormField label="メールアドレス">
                <div className="w-full">
                  <TextareaField
                    placeholder="入力してください"
                    register={register('email')}
                  />
                </div>
              </FormField>
            </div>

          </form>
        </div>


        <ButtonGroupFooter onSubmit={handleSubmit(onSubmit)} />
      </div>
    </LayoutAdmin>
  )
}

