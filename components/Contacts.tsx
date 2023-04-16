import React from 'react';
import Image from "next/image";

interface ContactsProps {
    name: string;
    src : string;
    status: string
};

const Contacts = ({ name, src, status } : ContactsProps) => {
    return (
      <div className="flex items-center space-x-2 py-2 pl-1 hover:bg-gray-200 rounded-l-xl cursor-pointer relative">
        <Image
          src={src}
          alt='contact'
          width={40}
          height={40}
          className="rounded-full cursor-pointer object-cover h-10"
        />
        <p className="hidden sm:inline-flex text-sm">{name}</p>
        {status === "online" && (
          <div className="bg-green-500 h-4 w-4 rounded-full absolute left-5 bottom-2 border-2"></div>
        )}
        {status === "offline" && (
          <div className="bg-gray-500 h-4 w-4 rounded-full absolute left-5 bottom-2 border-2"></div>
        )}
      </div>
    );
  };

export default Contacts
