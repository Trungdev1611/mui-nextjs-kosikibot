import React, { useState } from 'react';
import { useRouter } from 'next/router';

interface SidebarItem {
  name: string;
  route: string;
}

interface SidebarProps {
  items: SidebarItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ items }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div
        className={`fixed top-0 left-0 h-full w-[270px] bg-[#C8D0DA] z-50 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 md:translate-x-0 md:static md:flex md:flex-col`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="md:hidden absolute top-4 right-4 text-white"
        >
          Close
        </button>

        {items.map((item) => (
          <div
            key={item.route}
            onClick={() => {
              router.push(item.route);
              setIsOpen(false);
            }}
            className={`cursor-pointer py-[18px] pl-[30px] text-white hover:bg-[#878783] text-base font-semibold ${
              router.asPath === item.route ? 'bg-azureBlue' : ''
            }`}
          >
            {item.name}
          </div>
        ))}
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-[#C4C4C4] text-white p-2 rounded"
      >
        Menu
      </button>
    </>
  );
};

export default Sidebar;

