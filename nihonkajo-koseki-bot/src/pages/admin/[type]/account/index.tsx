
import React from 'react'
import { routeNames } from '../group'
import Breadcrumb from '@/components/Breadcrumb'
import Button from '@/components/Button'
import PlusIcon from '@/components/icons/PlusIcon'
import FormField from '@/components/FormField'
import DataTable from '@/components/DataTable'
import { ColumnsTable } from '@/interfaces/common'
import { CreateFakeData } from '@/utils/helpers'
import { useRouter } from 'next/router'
import { typeRoute } from '@/utils/auth'
import LayoutAdmin from '@/components/feature/layout/LayoutAccount'

const totalPage = 100

const columns: ColumnsTable = [
    { loginId: 'ログインID' },
    { name: '名前' },
    { groupName: '組織名' },
    { permission: '権限' },
    { createdAt: '登録日' },
    { dataType: 'データのタイプ' },
    { updatedAt: '更新日' },
];

const dataTableSample = {
    loginId: 'user001',
    name: 'Taro Yamada',
    groupName: 'Marketing',
    dataType: 'Regular',
    permission: 'Admin',
    createdAt: '2023-01-15',
    updatedAt: '2024-01-09',
}


export default function AccountAdmin() {
    const router = useRouter()

    return (
        <div className="flex flex-col h-screen">
            <LayoutAdmin>
                <div className="flex-1 p-5">
                    <Breadcrumb
                        routeNames={routeNames}
                    />
                    <div className="flex justify-end mt-[10px] gap-x-[10px]">
                        <Button
                            text="CSVダウンロード"
                            variant="secondary"
                            size="medium"
                            className="px-8 min-w-[180px]"
                            fullWidth
                        />

                        <Button
                            text="新規作成"
                            variant="primary"
                            size="medium"
                            className="px-8 min-w-[180px]"
                            fullWidth
                            icon={<PlusIcon />}
                            onClick={() => router.push(`/admin/${typeRoute()}/account/create`)}
                        />
                    </div>

                    <div className="flex w-full gap-[60px] items-center mt-[10px] py-[11.5px]">
                        <FormField
                            label="ログインID"
                            className="flex-1 gap-[15px]"
                            labelClassName="flex-1 max-w-[100px] min-w-[100px]"
                        >
                            <input
                                type="text"
                                className="flex-auto px-4 py-2 font-light text-sm border rounded gap-4 border-gray-pastel"
                                placeholder='ログインIDを入力'
                            />
                        </FormField>

                        <FormField
                            label="名前"
                            className="flex-1 gap-[15px]"
                            labelClassName="flex-1 max-w-[100px] min-w-[100px]"
                            placeholder='名前を入力'
                        >
                            <input
                                type="text"
                                className="flex-auto px-4 py-2 font-light text-sm border rounded gap-4 border-gray-pastel"
                            />
                        </FormField>
                    </div>

                    <div className="flex w-[calc(50%-30px)] gap-[60px] items-center mt-[10px] py-[11.5px]">
                        <FormField
                            label="組織名"
                            className="flex-1 gap-[15px]"
                            labelClassName="flex-1 max-w-[100px] min-w-[100px]"
                            placeholder='組織名を入力'
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
                        data={CreateFakeData(120, dataTableSample)}
                        columns={columns}
                        rowsPerPage={10}
                        totalPages={totalPage}
                        onEdit={() => {
                            router.push(`/admin/${typeRoute()}/account/edit`)
                        }}
                    // onPageChange={(page) => getGroups(page)}
                    />
                </div>
            </LayoutAdmin>



        </div>
    )
}

