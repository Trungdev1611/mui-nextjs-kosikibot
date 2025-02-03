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
import { getListGroup, updateGroup } from '@/services/group.service';
import { formatOption, getSelectValue } from '@/utils/functions';
import { GroupData } from '@/interfaces/group.interface';
import { useRouter } from 'next/router';
import { formatDate } from '@/utils/helpers';
import PlusIcon from '@/components/icons/PlusIcon';
import DataTable from '@/components/DataTable';
import { getListUser } from '@/services/user.service';
import LayoutAdmin from '@/components/feature/layout/LayoutAccount';

const columns: any = [
  { id: 'ログインID' },
  { user_name: '名前' },
  { created_at: '登録日' },
  { updated_at: '更新日' },
];

const PER_PAGE = 10;

export default function AdminGroupEdit() {
  const router = useRouter();
  const { id } = router.query;
  const [fields, setFields] = useState<any>();
  const [groupData, setGroupData] = useState<any>(null);
  const [dataUsers, setDataUsers] = useState<any>([]);
  const [totalPages, setTotalPages] = useState(1);

  const formRef = useRef<HTMLFormElement>(null);

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

  const getDataGroup: any = async () => {
    try {
      const body = {
        use_display_id: true,
        page: 1,
        per_page: 0,
        include_fields_data: true,
        include_lookups: true,
        conditions: [
          {
            id: 'id',
            search_value: [id],
          },
        ],
      };
      const res = await getListGroup(body);
      setGroupData(res.data?.items[0]);
      setFields(res.data?.fields);
      return {};
    } catch (error) {
      console.log('getDataGroup: err: ', error);
      return {};
    }
  };

  const getUsersGroup = async (page: number = 1) => {
    try {
      const body = {
        use_display_id: true,
        page,
        per_page: PER_PAGE,
        return_number_value: true,
        conditions: [
          {
            id: 'group',
            search_value: [groupData?.i_id],
          },
        ],
      };
      const res = await getListUser(body);
      setDataUsers(res?.data?.items);
      setTotalPages(Math.ceil(res?.data?.totalItems / PER_PAGE));
    } catch (error) {
      console.log(error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<GroupData>({
    resolver: yupResolver(groupSchema),
  });

  const prefectureValue = watch('prefecture', '');

  const onSubmit: SubmitHandler<any> = async (data: GroupData) => {
    try {
      console.log(data);
      const res = await updateGroup(groupData?.i_id, {
        item: {
          ...data,
          prefecture: getSelectValue(
            'prefecture',
            fields,
            prefectureValue,
          ) as string,
        },
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

  useEffect(() => {
    if (id) {
      getDataGroup();
    }
  }, [id]);

  useEffect(() => {
    reset(
      (({
        group_name = '',
        prefecture = '',
        address = '',
        person_name = '',
        phone = '',
        email = '',
        memo = '',
      } = {}) => ({
        group_name,
        prefecture,
        address,
        person_name,
        phone,
        email,
        memo,
      }))(groupData || {}),
    );
  }, [groupData]);

  useEffect(() => {
    if (groupData) {
      getUsersGroup();
    }
  }, [groupData]);

  return (
    <div className="flex flex-col h-screen">
      <LayoutAdmin>
        <div className="flex flex-1 min-h-full flex-col justify-between ">
          <div className="px-5 pt-5">
            <Breadcrumb routeNames={routeNames} />
            <form
              ref={formRef}
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-5 px-5 pt-9"
            >
              <div>
                <FormField label="登録ベンダー">
                  <p className="font-light text-sm uppercase px-[10px] py-[14px]">
                    {typeRoute()}
                  </p>
                </FormField>
              </div>
              <div>
                <FormField label="組織ID">
                  <p className="font-light text-sm uppercase px-[10px] py-[14px]">
                    {groupData?.id}
                  </p>
                </FormField>
              </div>
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
                      value={getSelectValue(
                        'prefecture',
                        fields,
                        prefectureValue,
                      )}
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

              <div>
                <FormField label="登録日時">
                  <p className="font-light text-sm uppercase px-[10px] py-[14px]">
                    {formatDate(groupData?.created_at, true)}
                  </p>
                </FormField>
              </div>
              <div>
                <FormField label="更新日時">
                  <p className="font-light text-sm uppercase px-[10px] py-[14px]">
                    {formatDate(groupData?.updated_at, true)}
                  </p>
                </FormField>
              </div>
            </form>
            <div className="px-5 mt-5">
              <div className="flex w-full justify-between items-center">
                <p className="text-sm font-bold text-txt-primary">
                  組織アカウント一覧
                </p>
                <Button
                  text="新規作成"
                  variant="primary"
                  size="medium"
                  className="px-8"
                  fullWidth
                  onClick={() => {}}
                  icon={<PlusIcon />}
                />
              </div>
              <div className="mt-5">
                <DataTable
                  data={dataUsers}
                  columns={columns}
                  rowsPerPage={PER_PAGE}
                  totalPages={totalPages}
                  onPageChange={(page) => getUsersGroup(page)}
                  onEdit={(row) =>
                    router.push(`/admin/${typeRoute()}/group/edit/${row.id}`)
                  }
                />
              </div>
            </div>
            <div className="flex justify-end pt-[15px] pb-[10px] px-5 mt-5">
              <button className="text-txt-primary text-sm font-bold underline">組織を削除する</button>
            </div>
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
