import React from 'react'
import { routeNames } from '../group'
import Breadcrumb from '@/components/Breadcrumb'
import DataTable from '@/components/DataTable'
import { ColumnsTable } from '@/interfaces/common'
import { useRouter } from 'next/router'
import { typeRoute } from '@/utils/auth'
import LayoutAdmin from '@/components/feature/layout/LayoutAccount'



const columns: ColumnsTable = [
    { typeSetting: '設定内容' },
    { lastUpdated: '基準日' },

];

const dataTableSample = [
    {typeSetting: `ヘッダー／フッター`, lastUpdated: `2024/11/12`, link: `custom/setting/edit`},
    {typeSetting: `サポート情報`, lastUpdated: `2024/11/12`, link: `custom/support/edit`},
]


export default function CustomAdmin() {
    const router = useRouter()
    return (
        <div className="flex flex-col h-screen">
            <LayoutAdmin>
                <div className="flex-1 p-5">
                    <Breadcrumb
                        routeNames={routeNames}
                    />
                    <div className='mt-6'>
                    <DataTable
                        data={dataTableSample}
                        columns={columns}
                        rowsPerPage={10}
                        onEdit={(row) => {
                  
                            router.push(`/admin/${typeRoute()}/${row.link}`)
                        }}
                    // onPageChange={(page) => getGroups(page)}
                    />
                    </div>
                   
                </div>
            </LayoutAdmin>



        </div>
    )
}

