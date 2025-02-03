import React from 'react'
import ArrowDown from '../../../../public/svg/ArrowDown';
import UserChatIcon from '../../../../public/svg/UserChatIcon';
import { Input } from 'antd';
import ArrowInput from '../../../../public/svg/ArrowInput';

export default function ChatContent() {
    return (
        <div className="flex flex-col p-8 h-[97vh] gap-y-5 z-10">

            {/* Header */}
            <div className="flex justify-between items-center">
                <div className="text-txt-secondary text-[12px] flex gap-3 items-center justify-center">
                    <span> 標準</span>
                    <span> <ArrowDown /></span>
                </div>
                <div className="flex justify-center items-center gap-2 text-[10px] text-txt-secondary">
                    <UserChatIcon />
                    <span>福岡市役所 戸籍化</span>
                    <ArrowDown />
                </div>
            </div>

            {/* Chat Content */}
            <div className="flex-1 overflow-y-auto flex flex-col justify-center items-center">
                <div className="h-[2000px] w-3/5">
                    Chat Content
                </div>
            </div>

            {/* Input Section */}
            <div className=' h-[80px] flex justify-center items-center input-section'>
                <div className='bg-[#F6F7F9] w-3/5 rounded-[8px] h-full input-ant-disable-effect relative flex justify-center items-center'>
                    <Input placeholder='質問を入力してください' className='h-full w-full'
                        style={{ backgroundColor: '#F6F7F9', outline: 'none', boxShadow: 'none' }}
                    />

                    <button className='flex gap-x-2 absolute right-[10px] border p-2 h-[48px] w-[81px] justify-center items-center rounded-lg bg-[#1F5FAD] text-white' disabled >
                        <span className='#E5E5E5'>送信</span>
                        <span><ArrowInput /></span>
                    </button>
                </div>



            </div>
        </div>
    );
}
