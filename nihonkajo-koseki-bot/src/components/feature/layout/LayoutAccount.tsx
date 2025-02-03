
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { typeRoute } from '@/utils/auth';
import React from 'react'


export const sidebarItems = [
  { name: '組織一覧', route: `/admin/${typeRoute()}/group` },
  { name: 'アカウント管理', route: `/admin/${typeRoute()}/account` },
  { name: 'コンテンツ管理', route: `/admin/${typeRoute()}/content` },
  { name: 'お知らせ', route: `/admin/${typeRoute()}/information` },
  { name: '設定', route: `/admin/${typeRoute()}/custom` },
  { name: 'Settings', route: '/settings' },
];


export default function LayoutAdmin({children}: {children: React.ReactNode}) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar items={sidebarItems} />
        {children}

      </div>
    </div>
  )
}
