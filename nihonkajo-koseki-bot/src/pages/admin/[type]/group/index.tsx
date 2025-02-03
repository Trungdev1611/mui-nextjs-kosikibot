import Breadcrumb from '@/components/Breadcrumb';
import Button from '@/components/Button';
import DataTable from '@/components/DataTable';
import FormField from '@/components/FormField';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import LayoutAdmin from '@/components/feature/layout/LayoutAccount';
import PlusIcon from '@/components/icons/PlusIcon';
import { getListGroup } from '@/services/group.service';
import { typeRoute } from '@/utils/auth';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const columns: any = [
  { id: '組織ID' },
  { group_name: '組織名' },
  { prefecture: '都道府県' },
  { created_at: '登録日' },
  { updated_at: '更新日' },
];

export const sidebarItems = [
  { name: '組織一覧', route: `/admin/${typeRoute()}/group` },
  { name: 'アカウント管理', route: `/admin/${typeRoute()}/account` },
  { name: 'Settings', route: '/settings' },
];
export const routeNames = {
  group: '組織一覧 ',
  users: 'User Management',
  settings: 'Settings',
};

const PER_PAGE = 10;

export default function AdminGroup() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);


  const getGroups = async (page: number = 1) => {
    try {
      const body = {
        use_display_id: true,
        page,
        per_page: PER_PAGE,
        return_number_value: true,
        conditions: [],
      };
      const res = await getListGroup(body);
      setData(res?.data?.items);
      setTotalPages(Math.ceil(res?.data?.totalItems / PER_PAGE));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGroups();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <LayoutAdmin>
        <div className="flex-1 p-5">
          <Breadcrumb routeNames={routeNames} />
          <div className="flex w-full justify-end mt-[10px]">
            <Button
              text="新規作成"
              variant="primary"
              size="medium"
              className="px-8"
              fullWidth
              onClick={() => router.push(`/admin/${typeRoute()}/group/create`)}
              icon={<PlusIcon />}
            />
          </div>

          <div className="flex w-full gap-[60px] items-center mt-[10px] py-[11.5px]">
            <FormField
              label="組織名"
              className="flex-1 gap-[15px]"
              labelClassName="flex-1 max-w-[100px] min-w-[100px]"
            >
              <input
                type="text"
                className="flex-auto px-4 py-2 font-light text-sm border rounded gap-4 border-gray-pastel"
              />
            </FormField>
            <FormField
              label="都道府県"
              className="flex-1 gap-[15px]"
              labelClassName="flex-1 max-w-[100px] min-w-[100px]"
            >
              <input
                type="text"
                className="flex-auto px-4 py-2 font-light text-sm border rounded gap-4 border-gray-pastel"
              />
            </FormField>
          </div>

          <div className="flex items-center gap-[19px] justify-center py-5 my-[10px]">
            <Button text="クリア" size="medium" className="px-8" fullWidth />
            <Button
              text="検索"
              variant="primary"
              size="medium"
              className="px-8"
              fullWidth
            />
          </div>
          <DataTable
            data={data}
            columns={columns}
            rowsPerPage={PER_PAGE}
            totalPages={totalPages}
            onPageChange={(page) => getGroups(page)}
            onEdit={(row) =>
              router.push(`/admin/${typeRoute()}/group/edit/${row.id}`)
            }
          />
        </div>
      </LayoutAdmin>
    </div>
  );
}
