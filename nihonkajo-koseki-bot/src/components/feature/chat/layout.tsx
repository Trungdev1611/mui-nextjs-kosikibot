'use client'
import { Layout } from 'antd'
import React, { useEffect, useState } from 'react'
import Slider from './Slider'
import { Content } from 'antd/es/layout/layout'

export default function LayoutChatCom({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const checkWindowWidth = () => {
          const width = window.innerWidth;
          console.log("width: ", width)
          if (width <= 1024) {
            setOpen(false); 
          } else {
            setOpen(true); 
          }
        };
    
        checkWindowWidth();
        window.addEventListener('resize', checkWindowWidth);
    
        return () => {
          window.removeEventListener('resize', checkWindowWidth);
        };
      }, []); 
  return (
    <section>
    <Layout 
        className="p-2 bg-white rounded-lg"
    >
        <Slider open = {open} setOpen = {setOpen}/>
        <Content style={{ marginLeft: open ? '320px' : '76px', background: "white"}}  >{children}</Content>
    </Layout>
</section>
  )
}
