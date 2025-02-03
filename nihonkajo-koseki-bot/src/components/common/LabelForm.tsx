import React from 'react'

interface LabelFormProps {
    label: string

}
export default function LabelForm(props: LabelFormProps) {
    const {label} = props
  return (
    <div className='text-txt-secondary text-[13px] font-semibold'>
      {label}
    </div>
  )
}
