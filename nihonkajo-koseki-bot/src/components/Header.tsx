import React, { useEffect, useState } from 'react';
import UserHeader from '../../public/svg/UserHeader';
import ArrowDown from '../../public/svg/ArrowDown';
import Image from 'next/image';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { deleteCookie, getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { typeRoute } from '@/utils/auth';


const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const infoCookie =  (getCookie('userInfo') as string || '{}')
   const userInfo = JSON.parse(infoCookie)?.userInfo
  
  const router = useRouter()
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  function handleLogout() {
    deleteCookie('o_token')
    deleteCookie('userInfo')
    router.push(`/admin/${typeRoute()}}/login`)
  }



return (
  <header className="w-full p-4 flex items-center justify-between border-b border-[#E0E0E0] px-6 header" >
    {/* <h1 className="text-xl font-bold">Management System</h1> */}
    <Image
      width={124}
      height={32}
      alt='logo'
      src='/imagefuji.png'
      className=''
      quality={100}
    />
    <div className='flex gap-4 items-center !text-[##1A1A1A]'>
      <UserHeader />
      <div className='text-[##1A1A1A]' >{userInfo?.username}</div>
      <IconButton onClick={handleOpenMenu} size="small">
        <ArrowDown />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        onClick={handleCloseMenu}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          mt: 1, py: 0,
          "& .MuiList-root": {
            py: '4px'
          }
        }}
      >
        <MenuItem onClick={handleLogout} >ログアウト</MenuItem>
      </Menu>

    </div>

  </header>
)
}

export default Header
