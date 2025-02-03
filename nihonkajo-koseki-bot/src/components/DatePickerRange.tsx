import React from 'react'
import CustomDateTimePicker from './DateTimePicker'
import { DateType } from '@/interfaces/common'


interface DatePickerRangeProps {
    nameStart: string
    nameEnd: string
    valuesDate: { [key: string]: DateType }
    setValuesDate: React.Dispatch<React.SetStateAction<{ [key: string]: DateType }>>
}
export default function DatePickerRange(props: DatePickerRangeProps) {
    const {nameStart, nameEnd, valuesDate, setValuesDate} = props

    function handleChange(name:string, date: DateType) {
        setValuesDate(prev => ({...prev, [name]: date}))
    }
    return (
        <div className='flex gap-x-2 items-center '>
            <CustomDateTimePicker  value={valuesDate[nameStart]}  onChange={(date) => handleChange(nameStart,date )} />
            <span className='font-bold text-xl'>~</span>
            <CustomDateTimePicker value={valuesDate[nameEnd]} onChange={(date) => handleChange(nameEnd,date )} />

        </div>
    )
}
