import React, { useState } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import { routeNames } from '@/pages/admin/[type]/group'
import FormField from '@/components/FormField';
import { typeRoute } from '@/utils/auth';
import InputField from '@/components/InputField';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import ErrorField from '@/components/common/ErrorField';
import { ContentData } from '@/interfaces/accountType';
import LayoutAdmin from '../layout/LayoutAccount';
import UploadFile from '@/components/UploadFile';
import CustomDateTimePicker from '@/components/DateTimePicker';
import dayjs from 'dayjs';
import CustomCheckbox from '@/components/CustomCheckbox';
import { ContentScheme } from '@/utils/schema';
import SelectField from '@/components/SelectField';
import { SelectChangeEvent } from '@mui/material';
import TextareaField from '@/components/TextareaField';
import ModalCustom from '@/components/Modal';
import ButtonGroupFooter from '@/components/ButtonGroupFooter';

export default function CreateOrEditContent() {

  const [openModal, setOpenModal] = useState(false)
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ContentData>({
    //@ts-expect-error(version conflict type)
    resolver: yupResolver(ContentScheme)
  });

  function onSubmit(valueData: ContentData) {
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
                <p className="font-light text-sm uppercase px-[10px] py-[14px]">
                  {typeRoute()}
                </p>
              </FormField>
            </div>

            <div>
              <FormField label="書籍名" required>
                <div className="w-full">
                  <InputField
                    type="text"
                    placeholder="入力してください"
                    register={register('bookTitle')}
                  />
                  <ErrorField errors={errors} name='bookTitle' />
                </div>
              </FormField>
            </div>

            <div className="w-full">
              <FormField label="ファイル" required>
                <div >
                  <UploadFile onFileChange={(dataFile) => setValue('file', dataFile as File)} />
                  <ErrorField errors={errors} name='file' />
                </div>
              </FormField>
            </div>

            <div >
              <FormField label="ファイルURL" required>
                <div className="w-full">
                  <InputField
                    type="text"
                    placeholder="入力してください"
                    register={register('fileUrl')}
                  />
                  <ErrorField errors={errors} name='fileUrl' />
                </div>
              </FormField>
            </div>

            <div className="w-formShort">
              <FormField label="パスワード（確認）" required>
                <div className="w-full">
                  <Controller
                    name="referenceDate"
                    control={control}
                    render={({ field }) => {
                      return <CustomDateTimePicker
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(date) => field.onChange(date)}
                      />
                    }

                    }
                  />
                  <ErrorField errors={errors} name='referenceDate' />
                </div>
              </FormField>
            </div>


            <div className="w-formShort">
              <FormField label="発刊日" >
                <div className="w-full">
                  <Controller
                    name="publicationDate"
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
                    defaultValue={false}
                    render={({ field }) => (
                      <CustomCheckbox
                        {...field}
                        label="検証中"
                        isChecked={field.value}
                      />
                    )}
                  />
                </div>
              </FormField>
            </div>


            <div className="w-formShort">
              <FormField label="所属組織">
                <div className="w-full">
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <SelectField options={[{ label: "test", value: "1" }]}
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

              <FormField label="タグ">
                <div className="w-full flex gap-x-3">
                  {
                    Array.from({ length: 8 }, (_, index) => index + 1).map(number => {
                      return <Controller
                        key={number}
                        name={`tag${number}`}
                        control={control}
                        defaultValue={false}
                        render={({ field }) => (
                          <CustomCheckbox
                            {...field}
                            label={`タグ${number}`}
                            isChecked={field.value as boolean}
                            value={field.value as boolean}
                          />
                        )}
                      />
                    })

                  }
                </div>
              </FormField>
            </div>

            <div className="w-full">
              <FormField label="根拠を区切る文字数" required>
                <div className="w-full">
                  <InputField
                    type="text"
                    placeholder="入力してください"
                    register={register('characters')}
                  />
                  <ErrorField errors={errors} name='characters' />
                </div>
              </FormField>
            </div>

            <div className="w-formShort">
              <FormField label="根拠の区切り方" required>
                <div className="w-full">
                  <Controller
                    name="category1"
                    control={control}
                    render={({ field }) => (
                      <SelectField options={[{ label: "test", value: "1" }]}
                        value={field.value}
                        placeholder='選択してください'
                        onChange={(e: SelectChangeEvent) => {
                          field.onChange(e.target.value)
                        }} />
                    )}
                  />
                            <ErrorField errors={errors} name='category1' />
                </div>
              </FormField>
            </div>

            <div className="w-full">
              <FormField label="除外ページ" >
                <div className="w-full">
                  <InputField
                    type="text"
                    placeholder="入力してください"
                    register={register('excludePages')}
                  />
                  <ErrorField errors={errors} name='excludePages' />
                </div>
              </FormField>
            </div>
           

            <div className="w-full">
              <FormField label="メールアドレス">
                <div className="w-full">
                  <TextareaField
                    placeholder="入力してください"
                    register={register('desc')}
                  />
                </div>
              </FormField>
            </div> 


          </form>
        </div>
        <div className='flex justify-end pr-10'>
        <span className='text-sm font-bold text-[#4D4D4D]' onClick = {handleDelete}>組織を削除する</span>
      </div>
        <ButtonGroupFooter onSubmit={handleSubmit(onSubmit)} />
 
      </div>

  

      <ModalCustom isOpen = {openModal} message='コンテンツを削除してもよろしいですか？' onConfirm={handleConfirm} onClose={() => setOpenModal(false)} title= {null}/>
    </LayoutAdmin>
  )
}

