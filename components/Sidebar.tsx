import Image from 'next/image'
import React from 'react';
import { ImUsers } from "react-icons/im";
import { MdGroups } from "react-icons/md";
import { AiOutlineShop } from "react-icons/ai";
import { MdOutlineOndemandVideo, MdOutlineExpandMore } from "react-icons/md";
import { BsStopwatch } from "react-icons/bs";
import { useSession } from "next-auth/react";
import SidebarItem from './SidebarItem';

const Sidebar = () => {
    const {data : session} = useSession();

    return (
        <div className='hidden lg:inline-flex flex-col py-2 pl-2 max-w-xl lg:min-w-[302px]'>
        <div className='flex items-center space-x-2 py-3 pl-4 hover:bg-gray-200 xl:rounded-l cursor-pointer'>
        <Image src={session?.user?.image || ''} className='rounded-full cursor-pointer' height={40} width={40} alt='fb logo' />
                <p className='hidden sm:inline-flex font-medium'>{session?.user?.name?.split(" ")[0]}</p>
        </div>
        <SidebarItem Icon={ImUsers} value="Friends" />
        <SidebarItem Icon={MdGroups} value="Groups" />
        <SidebarItem Icon={AiOutlineShop} value="MarketPlace" />
        <SidebarItem Icon={MdOutlineOndemandVideo} value="Watch" />
        <SidebarItem Icon={BsStopwatch} value="Memeries" />
        <SidebarItem Icon={MdOutlineExpandMore} value="See more" />
        </div>
    )
}

export default Sidebar
