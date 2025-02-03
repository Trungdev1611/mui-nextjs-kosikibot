import React from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import { routeNames } from '@/pages/admin/[type]/group'
import FormField from '@/components/FormField';
import { typeRoute } from '@/utils/auth';
import InputField from '@/components/InputField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import ErrorField from '@/components/common/ErrorField';
import { CustomDataType } from '@/interfaces/accountType';
import LayoutAdmin from '../layout/LayoutAccount';
import UploadFile from '@/components/UploadFile';
import { CustomScheme } from '@/utils/schema';
import ButtonGroupFooter from '@/components/ButtonGroupFooter';

export default function EditSettingCom() {

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<CustomDataType>({
        //@ts-expect-error("version is not fit")
        resolver: yupResolver(CustomScheme)
    });

    function onSubmit(valueData: CustomDataType) {
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

                        <div className="w-full">
                            <FormField label="ロゴ" required>
                                <div >
                                    <UploadFile onFileChange={(dataFile) => setValue('file', dataFile as File)} />
                                    <ErrorField errors={errors} name='file' />
                                </div>
                            </FormField>
                        </div>

                        <div>
                            <FormField label="運営会社">
                                <div className="w-full">
                                    <InputField
                                        type="text"
                                        placeholder="https://XXXX"
                                        register={register('operatingcompany')}
                                    />
                                </div>
                            </FormField>
                        </div>
                        <div >
                            <FormField label="利用規約" >
                                <div className="w-full">
                                    <InputField
                                        type="text"
                                        placeholder="https://XXXX"
                                        register={register('term')}
                                    />
                                </div>
                            </FormField>
                        </div>

                        <div >
                            <FormField label="プライバシーポリシー" >
                                <div className="w-full">
                                    <InputField
                                        type="text"
                                        placeholder="https://XXXX"
                                        register={register('policy')}
                                    />
                                </div>
                            </FormField>
                        </div>

                        <div >
                            <FormField label="お問い合わせURL" >
                                <div className="w-full">
                                    <InputField
                                        type="text"
                                        placeholder="https://XXXX"
                                        register={register('contactUrl')}
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
                <ButtonGroupFooter onSubmit={handleSubmit(onSubmit)} />

            </div>



        </LayoutAdmin>
    )
}

