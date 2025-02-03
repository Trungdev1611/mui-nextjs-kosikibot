import { Button } from 'antd'
import { ButtonColorType, ButtonVariantType } from 'antd/es/button'
import React from 'react'

interface ButtonProps {
    className?: string
    disabled?: boolean
    color?: ButtonColorType
    textBtn: string | null
    variant?: ButtonVariantType
    icon?: React.ReactNode

}
export default function ButtonCom(props: ButtonProps) {
    const { className = '', textBtn, color = "primary", disabled = false , variant = "solid", icon} = props
    return (
        <Button color={color}
            variant={variant}
            prefix=''
            className={className}
            htmlType='submit'
            disabled={disabled}
            icon = {icon}

        >   {textBtn}  </Button>
    )
}
