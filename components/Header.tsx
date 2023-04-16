import Image from 'next/image'
import React, { useEffect } from 'react';
import {HiOutlineSearch, HiOutlineHome} from 'react-icons/hi';
import { MdOutlineExpandMore, MdOutlineOndemandVideo } from "react-icons/md";
import { RiFlag2Line } from "react-icons/ri";
import { IoGameControllerOutline } from "react-icons/io5";
import { CgMenuGridO } from "react-icons/cg";
import { AiFillMessage, AiFillBell, AiOutlineShop } from "react-icons/ai";
import {CiLogout} from "react-icons/ci";
import {useSession} from 'next-auth/react';
import { Dropdown } from "@nextui-org/react";
import {signOut} from 'next-auth/react';

const Header = () => {
    const {data : session} = useSession();
    const [selected, setSelected] = React.useState(new Set(["more"]));
    const setSelection = (e: any) => {
        signOut();
    }
    return (
        <div className='bg-white flex items-center p-2 shadow-md top-0 sticky z-50 h-16'>
            {/* left div */}
            <div className='flex min-w-fit'>
                <Image src='https://cdn-icons-png.flaticon.com/512/124/124010.png' className='rounded-full' height={40} width={40} alt='fb logo' />
                <div className='flex items-center space-x-2 px-2 ml-2 rounded-full bg-gray-100 text-gray-500'>
                    <HiOutlineSearch size={20}/>
                    <input type="text" placeholder='Search facebook' className='hidden lg:inline-flex focus:outline-none bg-transparent'></input>
                </div>
            </div>
            {/* center div */}
            <div className='flex flex-grow justify-center mx-2'>
                <div className='fex items-center'>
                    <div className='flex items-center h-14 px-4 md:px-10 rounded-md md:hover:bg-gray-100 cursor-pointer'>
                        <HiOutlineHome className="mx-auto" size={25}/>
                    </div>
                </div>
                <div className='fex items-center'>
                    <div className='flex items-center h-14 px-4 md:px-10 rounded-md md:hover:bg-gray-100 cursor-pointer'>
                        <RiFlag2Line className="mx-auto" size={25}/>
                    </div>
                </div>
                <div className='fex items-center'>
                    <div className='flex items-center h-14 px-4 md:px-10 rounded-md md:hover:bg-gray-100 cursor-pointer'>
                        <MdOutlineOndemandVideo className="mx-auto" size={25}/>
                    </div>
                </div>
                <div className='fex items-center'>
                    <div className='flex items-center h-14 px-4 md:px-10 rounded-md md:hover:bg-gray-100 cursor-pointer'>
                        <AiOutlineShop className="mx-auto" size={25}/>
                    </div>
                </div>
                <div className='fex items-center'>
                    <div className='flex items-center h-14 px-4 md:px-10 rounded-md md:hover:bg-gray-100 cursor-pointer'>
                        <IoGameControllerOutline className="mx-auto" size={25}/>
                    </div>
                </div>
            </div>
            {/* right div */}
            <div className="flex items-center space-x-2 justify-end min-w-fit">
            <Image
            src={session?.user?.image || ''}
            //   src={session?.user.image}
            height={40}
            alt="user-img"
            width={40}
            //   onClick={signOut}
            className="rounded-full cursor-pointer"
            />
            <p className="hidden xl:inline-flex font-semibold text-sm whitespace-nowrap p-3 max-w-xs">
                {session?.user?.name?.split(" ")[0]}
            </p>
            <CgMenuGridO
            size={20}
            className=" hidden lg:inline-flex h-10 w-10 bg-gray-200 text-gray-600 rounded-full p-2 cursor-pointer hover:bg-gray-300"
            />
            <AiFillMessage
            size={20}
            className=" hidden lg:inline-flex h-10 w-10 bg-gray-200 text-gray-600 rounded-full p-2 cursor-pointer hover:bg-gray-300"
            />
            <AiFillBell
            size={20}
            className=" hidden lg:inline-flex h-10 w-10 bg-gray-200 text-gray-600 rounded-full p-2 cursor-pointer hover:bg-gray-300"
            />
            <div>
                <Dropdown>
                    <Dropdown.Button flat color="default" className="hidden lg:inline-flex h-10 w-10 bg-gray-200 text-gray-600 rounded-full p-2 cursor-pointer hover:bg-gray-300">
                        
                    </Dropdown.Button>
                    <Dropdown.Menu aria-label="Actions"  selectionMode="single" selectedKeys={selected}
                        onSelectionChange={(e: any) => setSelection(e)} >
                        
                        <Dropdown.Item
                        key="logout"
                        icon={<CiLogout size={20} />}
                        >
                        Logout
                        </Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
        </div>
    )
}

export default Header
