import { MessagengerList } from "@/pages/interfaces";
import Image from "next/image";
import React from "react";



const MessagingList = (props : {messageList : { [key:string] : MessagengerList} | undefined, setChatId : (param : any) => void}) => {
    return (
    <div className="sidebar hidden lg:flex w-1/3 flex-2 flex-col pr-6">
        <div className="search flex-2 pb-6 px-2">
            <input type="text" className="outline-none py-2 block w-full bg-transparent border-b-2 border-gray-200" placeholder="Search"/>
        </div>
        <div className="flex-1 h-full overflow-auto px-2">
            {
                Object.values(props?.messageList || []).map((message, idx) => 
                        <div key={idx} onClick={() => props.setChatId(message.messengerUserId.id)} className="entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-white mb-4 rounded p-4 flex shadow-md">
                            <div className="flex-2">
                                <div className="w-12 h-12 relative">
                                    <Image width={100} height={100} className="w-12 h-12 rounded-full mx-auto" src={message.messengerUserId.image} alt="chat-user" />
                                    <span className="absolute w-4 h-4 bg-green-400 rounded-full right-0 bottom-0 border-2 border-white"></span>
                                </div>
                            </div>
                            <div className="flex-1 px-2">
                                <div className="truncate w-32"><span className="text-gray-800">{message.messengerUserId.name}</span></div>
                                <div><small className="text-gray-600">{message.text}</small></div>
                            </div>
                            <div className="flex-2 text-right">
                                <div><small className="text-gray-500">{message.ts}</small></div>
                                {/* <div>
                                    <small className="text-xs bg-red-500 text-white rounded-full h-6 w-6 leading-6 text-center inline-block">
                                        23
                                    </small>
                                </div> */}
                            </div>
                        </div>
                    )
            }
            
        </div>
    </div>
  );
};

export default MessagingList;
