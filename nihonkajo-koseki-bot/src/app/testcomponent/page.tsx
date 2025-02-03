'use client'

import InputField from '@/components/InputField'
import InputFieldAuth from '@/components/InputFieldAuth'
import SelectField from '@/components/SelectField'
import React from 'react'
import ArrowDown from '../../../public/svg/ArrowDown'
import DataTable from '@/components/DataTable'
import CustomDateTimePicker from '@/components/DateTimePicker'
import dayjs from 'dayjs'
import UploadFile from '@/components/UploadFile'


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const columns: any = [
    { id: '組織ID' },
    { group_name: '組織名' },
    { prefecture: '都道府県' },
    { created_at: '登録日' },
    { updated_at: '更新日' },
  ];


  const dataSample = [
    {
      '組織ID': '001',
      'group_name': '株式会社ABC',
      'prefecture': '東京都',
      'created_at': '2024/01/01',
      'updated_at': '2024/01/09',
    },
    {
      '組織ID': '002',
      'group_name': '合同会社DEF',
      'prefecture': '大阪府',
      'created_at': '2023/11/15',
      'updated_at': '2023/12/20',
    },
    {
      '組織ID': '003',
      'group_name': '株式会社GHI',
      'prefecture': '愛知県',
      'created_at': '2022/05/10',
      'updated_at': '2023/08/25',
    },
    {
      '組織ID': '004',
      'group_name': '有限会社JKL',
      'prefecture': '福岡県',
      'created_at': '2023/09/30',
      'updated_at': '2023/12/05',
    },
  ];
  
  


export default function TestComponent() {
    return (
        <div className='flex flex-col gap-y-20'>
            <div>
                <div>InputField Text</div>
                <InputField
                    // LeftIcon = {<div>11111111</div>}
                    LeftIcon={ArrowDown}
                    label="ログインID"
                    className ="w-[500px]"
                />
            </div>
            <div>
                <div>InputField Pass</div>
                <InputField type="password" />
            </div>
            <div>
                <div>InputFieldAuth</div>
                <InputFieldAuth label="InputFieldAuth" />
            </div>
            <div>
                <div>SelectField</div>
                <SelectField options={[]} value='1' placeholder='test' onChange={() => { }} />
            </div>

            <div>
              <div>Date Time Picker</div>
              <CustomDateTimePicker  value = {dayjs()} onChange = {(date) => {console.log("date", date)}}/>
            </div>

            <div>
            UploadFile
            <UploadFile />
            </div>
            <DataTable
            data={dataSample}
            columns={columns}
            rowsPerPage={10}
            totalPages={100}
            // onPageChange={(page) => getgroups(page)}
          />

        </div>
    )
}
