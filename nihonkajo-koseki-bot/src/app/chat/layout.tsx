
import React from 'react'
import LayoutChatCom from '@/components/feature/chat/layout';
export default function LayoutChat({
    children,
}: {
    children: React.ReactNode
}) {


    return (
        <section>
            <LayoutChatCom
            >
                {children}
            </LayoutChatCom>
        </section>
    )
}
