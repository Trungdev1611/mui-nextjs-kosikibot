import React, { useState } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import { routeNames } from '@/pages/admin/[type]/group'
import FormField from '@/components/FormField';
import { typeRoute } from '@/utils/auth';
import InputField from '@/components/InputField';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InforScheme } from '@/utils/schema';
import SelectField from '@/components/SelectField';
import TextareaField from '@/components/TextareaField';
import ErrorField from '@/components/common/ErrorField';
import { InforDataType } from '@/interfaces/accountType';
import LayoutAdmin from '../layout/LayoutAccount';
import ButtonGroupFooter from '@/components/ButtonGroupFooter';
import { SelectChangeEvent } from '@mui/material';
import CustomDateTimePicker from '@/components/DateTimePicker';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import CustomCheckbox from '@/components/CustomCheckbox';
import ModalCustom from '@/components/Modal';
import DeleteText from '@/components/common/DeleteText';


export default function CreateOrEditInfor() {
  const router = useRouter();
  const { id } = router.query;
  const defaultValues = id ? {
    title: `システムメンテナンスのお知らせ`,
    category: `1`,
    desc: `本サービスは2024年10月27日(日)1:00〜3:00にサーバーのメンテナンスを実施します。停止に伴い、下記の通りサービスを一時休止いたします。お客様にはご不便をおかけいたしまして、誠に申し訳ございませんが、ご了承くださいますようお願い申し上げます。
※メンテナンス終了時間は都合により変更する場合がございますのでご了承ください。`,
    createdAt: `2024/12/13 12:00`,
    updatedAt: `2024/12/15 12:00`

  } : {}
  const [openModal, setOpenModal] = useState(false)
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<InforDataType>({
    resolver: yupResolver(InforScheme),
    defaultValues
  });




  function onSubmit(valueData: InforDataType) {
    console.log("valueData", valueData)
  }
  function handleDelete() {
    setOpenModal(true)
  }

  function handleConfirm() {

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
                <div className="font-light text-sm uppercase px-[10px] py-[14px]">
                  {typeRoute()}
                </div>
              </FormField>
            </div>

            <div className="w-full">
              <FormField label="タイトル" required>
                <div className="w-full">
                  <InputField
                    type="text"
                    placeholder="入力してください"
                    register={register('title')}
                  />
                  <ErrorField errors={errors} name='title' />

                </div>
              </FormField>
            </div>


            <div className="w-formShort">
              <FormField label="所属組織" required>
                <div className="w-full">
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <SelectField options={[{ label: "お知らせ", value: "1" }]}
                        value={field.value}
                        placeholder='選択してください'
                        onChange={(e: SelectChangeEvent) => {
                          field.onChange(e.target.value)
                        }} />
                    )}
                  />
                </div>
              </FormField>
            </div>

            <div className="w-full">
              <FormField label="メールアドレス" required>
                <div className="w-full">
                  <TextareaField
                    placeholder="入力してください"
                    register={register('desc')}
                  />
                  <ErrorField errors={errors} name='desc' />
                </div>
              </FormField>
            </div>


            <div className="w-formShort">
              <FormField label="パスワード（確認）" required>
                <div className="w-full">
                  <Controller
                    name="createdAt"
                    control={control}
                    render={({ field }) => {
                      return <CustomDateTimePicker
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(date) => field.onChange(date)}
                      />
                    }}
                  />
                  <ErrorField errors={errors} name='createdAt' />
                </div>
              </FormField>
            </div>

            <div className="w-formShort">
              <FormField label="パスワード（確認）">
                <div className="w-full">
                  <Controller
                    name="updatedAt"
                    control={control}
                    render={({ field }) => {
                      return <CustomDateTimePicker
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(date) => field.onChange(date)}
                      />
                    }}
                  />
                </div>
              </FormField>
            </div>

            <div className="w-full">
              <FormField label="ステータス">
                <div className="w-full">
                  <Controller
                    name="status"
                    control={control}
                    defaultValue={true}
                    render={({ field }) => (
                      <CustomCheckbox
                        {...field}
                        label="検証中"
                        isChecked={Boolean(field.value)}
                      />
                    )}
                  />
                </div>
              </FormField>
            </div>

            <div>
              <FormField label="登録日時">
                <p className="font-light text-sm uppercase px-[10px] py-[14px]">
                  2024/11/2 12:09
                </p>
              </FormField>
            </div>

            <div>
              <FormField label="最終更新日時">
                <p className="font-light text-sm uppercase px-[10px] py-[14px]">
                  2024/11/2 12:09
                </p>
              </FormField>
            </div>
          </form>
        </div>
        <DeleteText isShow={Boolean(id)} handleDelete={handleDelete} />
        <ButtonGroupFooter onSubmit={handleSubmit(onSubmit)} />
      </div>
      <ModalCustom isOpen={openModal} message='コンテンツを削除してもよろしいですか？' onConfirm={handleConfirm} onClose={() => setOpenModal(false)} title={null} />

    </LayoutAdmin>
  )
}

