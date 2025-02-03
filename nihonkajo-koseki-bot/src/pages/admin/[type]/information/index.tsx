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
    { title: 'タイトル' },
    { category: 'カテゴリ' },
    { createdAt: '登録日' },
    { updatedAt: '更新日' },
];

const dataTableSample = {
    title: "新たな書籍「法廷の知恵」を追加しました。",
    category: "お知らせ",
    createdAt: '2023-01-15',
    updatedAt: '2024-01-09',
};


export default function ContentAdmin() {
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
                            text="新規作成"
                            variant="primary"
                            size="medium"
                            className="px-8 min-w-[180px]"
                            fullWidth
                            icon={<PlusIcon />}
                            onClick={() => router.push(`/admin/${typeRoute()}/information/create`)}
                        />
                    </div>

                    <div className="flex w-full gap-[60px] items-center mt-[10px] py-[11.5px]">
                        <FormField
                            label="タイトル"
                            className="flex-1 gap-[15px] !w-[50%]"
                            labelClassName="flex-1 max-w-[100px] min-w-[100px]"
                        >
                            <input
                                type="text"
                                className="flex-auto px-4 py-2 font-light text-sm border rounded gap-4 border-gray-pastel !w-full "
                                placeholder='書籍名を入力'
                            />
                        </FormField>

                        <FormField
                            label="カテゴリ"
                            className="flex-1 gap-[15px] !w-[50%]"
                            labelClassName="flex-1 max-w-[100px] min-w-[100px]"
                            placeholder='選択してください'
                        >
                            <input
                                type="text"
                                className="flex-auto px-4 py-2 font-light text-sm border rounded gap-4 border-gray-pastel !w-full "
                                placeholder='書籍名を入力'
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
                        onEdit={(row) => {
                            console.log("row", row)
                            router.push(`/admin/${typeRoute()}/information/edit/${row.id}`)
                        }}
                    // onPageChange={(page) => getGroups(page)}
                    />
                </div>
            </LayoutAdmin>



        </div>
    )
}

