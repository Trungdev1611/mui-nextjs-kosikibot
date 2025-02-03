
import Sider from 'antd/es/layout/Sider'
import React from 'react'
import IconToleft from '../../../../public/svg/IconToleft'
import Image from 'next/image'
import ButtonCom from '@/components/common/ButtonCom'
import { Menu, MenuProps } from 'antd'
import ChatIcon from '../../../../public/svg/ChatIcon'
import PlusIcon from '../../../../public/svg/PlusIcon'
import IconListSideBar from '../../../../public/svg/IconListSideBar'
import Question from '../../../../public/svg/Question'


const items2: MenuProps['items'] = Array.from({ length: 3 }).map(
    (icon, index) => {
        const key = String(index + 1);

        return {
            key: `sub${key}`,
            label: `帰化者の称する氏 ${index + 1}`,

            children: new Array(7).fill(null).map((_, j) => {
                const subKey = index * 4 + j + 1;
                return {
                    key: subKey,
                    label: `option${subKey}`,
                    icon: <ChatIcon />,
                };
            })

        };
    },
);
const itemData = [ {
    key: `sub${items2.length + 1}`,
    label: `書籍一覧`,
    icon: <IconListSideBar />,
}, {
    key: `sub${items2.length + 2}`,
    label: `サポート`,
    icon: <Question />,
}]



const openKeys = itemData.map((_, index) => `sub${index + 1}`);


interface SliderProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export default function Slider(props: SliderProps) {
    const { open, setOpen } = props

    function handleOpen() {
        setOpen(true)
    }

    function handleClose() {
        setOpen(false)
    }
    return (
        <Sider style={{
            background: '#F6F7F9',
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100vh',
            padding: '10px',

        }} width={open ? 320 : 76} className='flex flex-col pl-4'>

        

            <div className='bg-[#F6F7F9] ' >
                {open && <Image
                    width={124}
                    height={32}
                    alt='logo'
                    src='/imagefuji.png'
                    className=''
                    quality={100}
                />}


                <ButtonCom icon={<PlusIcon />}
                    className={`!bg-azureBlue !text-white ${open ? "w-[90%] p-[20px] !py-4 !h-[44px]" : "!w-[40px] !h-[40px] !rounded-[50%] !p-0 !pl-3 ml-2"} `}
                    textBtn={open ? '新しいチャットを開始' : null} />


            </div>
            <div style={{ height: 'calc(100vh - 250px)', overflowY: open ? 'scroll' : undefined }} >
                {open ? <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    className='flex-1 menu-chat'
                    items={items2}
                    style={{ background: '#F6F7F9' }}
                    openKeys={openKeys}
                    expandIcon={null}

                /> : null}

                
            </div>
            <div className='mt-5'>
                  {itemData.map(item => {
                    return <div key={item.key} className='flex pl-6 gap-x-4 mt-3'>
                        <span>{item.icon}</span>
                       {open && <span>{item.label}</span>}  
                    </div>
                  })}
                </div>

            {open && <div className='absolute left-[300px] top-[55px] cursor-pointer p-2 z-[9999]' onClick={handleClose} >
                <IconToleft />
            </div>}
            {!open && <div className='absolute left-[60px] top-[10px] rotate-180 cursor-pointer p-2 mr-2 z-[9999] ' onClick={handleOpen}>
                <IconToleft />
            </div>}
        </Sider>
    )
}
