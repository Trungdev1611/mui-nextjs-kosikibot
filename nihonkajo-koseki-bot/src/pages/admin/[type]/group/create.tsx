import { useEffect, useRef, useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import Button from '@/components/Button';
import FormField from '@/components/FormField';
import Header from '@/components/Header';
import InputField from '@/components/InputField';
import SelectField from '@/components/SelectField';
import Sidebar from '@/components/Sidebar';
import TextareaField from '@/components/TextareaField';
import { typeRoute } from '@/utils/auth';
import { groupSchema } from '@/utils/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createGroup, getFieldsGroup } from '@/services/group.service';
import { formatOption } from '@/utils/functions';
import { getCookie } from 'cookies-next';
import { GroupData } from '@/interfaces/group.interface';
import { useRouter } from 'next/router';
import React from 'react'
import LayoutAdmin from '@/components/feature/layout/LayoutAccount';

 const sidebarItems = [
  { name: '組織一覧', route: `/admin/${typeRoute()}/group` },
  { name: 'Users', route: '/users' },
  { name: 'Settings', route: '/settings' },
];
 const routeNames = {
  group: '組織一覧 ',
  users: 'User Management',
  settings: 'Settings',
};


export default function AdminGroupCreate() {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [fields, setFields] = useState<any>();
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<GroupData>({
    resolver: yupResolver(groupSchema),
  });

  const prefectureValue = watch('prefecture', '');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit: SubmitHandler<any> = async (data: GroupData) => {
    try {
      const type = typeRoute();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const vendor: any = getCookie(`vendor_${type}`);
      const dataVendor = JSON.parse(vendor);

      const res = await createGroup({
        item: { ...data, vendor: dataVendor?.i_id },
      });
      if (res.status !== 200) throw 'Error';
      router.push(`/admin/${typeRoute()}/group`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true }),
      );
    }
  };

  const getFields = async () => {
    try {
      const res = await getFieldsGroup();
      setFields(Object.values(res.data.fields));
    } catch (error) {
      console.log('getFields error: ', error);
    }
  };

  useEffect(() => {
    getFields();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <LayoutAdmin>
        <div className="flex flex-1 min-h-full flex-col justify-between ">
          <div className="px-5 pt-5">
            <Breadcrumb routeNames={routeNames} />
            <form
              ref={formRef}
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-5 px-5 py-9"
            >
              <div>
                <FormField label="登録ベンダー">
                  <p className="font-light text-sm uppercase px-[10px] py-[14px]">
                    {typeRoute()}
                  </p>
                </FormField>
              </div>
              {/* <div>
                <FormField label="組織ID" required>
                  <InputField type="text" placeholder="組織ID" />
                </FormField>
              </div> */}
              <div className="w-full">
                <FormField label="組織名" required>
                  <div className="w-full">
                    <InputField
                      type="text"
                      placeholder="入力してください"
                      register={register('group_name')}
                    />
                    {errors.group_name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.group_name.message}
                      </p>
                    )}
                  </div>
                </FormField>
              </div>
              <div className="w-formShort">
                <FormField label="都道府県名" required>
                  <div className="w-full">
                    <SelectField
                      value={prefectureValue}
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      onChange={(e: any) =>
                        setValue('prefecture', e.target.value)
                      }
                      options={formatOption('prefecture', fields)}
                      placeholder="入力してください"
                      ref={register('prefecture').ref}
                    />
                    {errors.prefecture && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.prefecture.message}
                      </p>
                    )}
                  </div>
                </FormField>
              </div>
              <div className="w-full">
                <FormField label="所在地住所">
                  <div className="w-full">
                    <InputField
                      type="text"
                      placeholder="入力してください"
                      register={register('address')}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.address.message}
                      </p>
                    )}
                  </div>
                </FormField>
              </div>
              <div className="w-full">
                <FormField label="担当者名">
                  <div className="w-full">
                    <InputField
                      type="text"
                      placeholder="入力してください"
                      register={register('person_name')}
                    />
                    {errors.person_name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.person_name.message}
                      </p>
                    )}
                  </div>
                </FormField>
              </div>
              <div className="w-full">
                <FormField label="電話番号">
                  <div className="w-full">
                    <InputField
                      type="text"
                      placeholder="入力してください"
                      register={register('phone')}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </FormField>
              </div>
              <div className="w-full">
                <FormField label="メールアドレス">
                  <div className="w-full">
                    <InputField
                      type="text"
                      placeholder="入力してください"
                      register={register('email')}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </FormField>
              </div>
              <div className="w-full">
                <FormField label="メモ">
                  <div className="w-full">
                    <TextareaField
                      placeholder="入力してください"
                      register={register('memo')}
                    />
                    {errors.memo && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.memo.message}
                      </p>
                    )}
                  </div>
                </FormField>
              </div>
            </form>
          </div>
          <div className="flex justify-center gap-[10px] p-5 w-full mt-9 bg-[#C8D0DA] border-l border-l-gray-light">
            <Button
              text="戻る"
              size="medium"
              className="px-8"
              fullWidth
              onClick={() => router.back()}
            />
            <Button
              type="submit"
              text="保存"
              variant="primary"
              size="medium"
              className="px-8"
              fullWidth
              onClick={handleFormSubmit}
            />
          </div>
        </div>
      </LayoutAdmin>
    </div>
  );
}
