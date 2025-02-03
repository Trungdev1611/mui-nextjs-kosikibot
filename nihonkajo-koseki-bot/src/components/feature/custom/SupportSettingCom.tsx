import React from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import { routeNames } from '@/pages/admin/[type]/group'
import FormField from '@/components/FormField';
import { typeRoute } from '@/utils/auth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { CustomDataSupportType } from '@/interfaces/accountType';
import LayoutAdmin from '../layout/LayoutAccount';
import ButtonGroupFooter from '@/components/ButtonGroupFooter';
import TextareaField from '@/components/TextareaField';
import ErrorField from '@/components/common/ErrorField';
import { CustomSchemeSupport } from '@/utils/schema';

export default function SupportSettingCom() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CustomDataSupportType>({
        resolver: yupResolver(CustomSchemeSupport),
        //         defaultValues: {
        //             desc: `本サービスに関するご質問や不具合は、以下の担当ベンダーへ直接お問い合わせください。【お問い合わせ先】
        // 電話番号：03-1111-2222
        // お問い合わせフォーム： https://toiawase.com`
        //         }
    });

    function onSubmit(valueData: CustomDataSupportType) {
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

