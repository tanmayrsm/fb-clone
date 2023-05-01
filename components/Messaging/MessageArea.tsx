import { sendMessageToUser } from '@/pages/api/service';
import { selectUser } from '@/public/src/features/userSlice';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import MessagingList from './MessagingList';

const MessageArea = (props : {messagePayload : any}) => {
    const user = useSelector(selectUser);
    const msg:any = useRef(null);

    useEffect(() => {
        // api call for all msg list for user
        console.log("call for userid ::", user?.id);
    }, []);

    const sendMessage = () => {
        if(msg?.current?.value) {
            sendMessageToUser(user.id, props?.messagePayload?.otherUserData?.id, props?.messagePayload?.listData[0]?.grouper || null, msg.current.value);
            msg.current.value = '';
        }
    }

    return (
        <div className="chat-area flex-1 flex flex-col">
            <div className="flex-3">
                <div className='flex justify-between border-b-2 border-gray-200'>
                    <div className="text-xl py-1 mb-1">
                        <b>{props.messagePayload?.otherUserData?.name}</b>
                    </div>
                    <div className="text-xl py-1 mb-1">
                        <span className="inline-block text-gray-700">
                            <span className="inline-block w-4 h-4 bg-green-400 rounded-full border-2 border-white"></span> <b>Online</b>
                            
                        </span>
                    </div>
                </div>

                
            </div>
            <div className="messages flex-1 mt-3 overflow-auto">
                {
                    props.messagePayload?.listData?.map((msgData : any, idx : string) => 
                        <div key={idx}>
                            {
                                msgData.msgFrom !== user.id ?
                                <div className="message mb-4 flex">
                                    <div className="flex-2">
                                        <div className="w-12 h-12 relative">
                                            <Image width={100} height={100} className="w-12 h-12 rounded-full mx-auto" src={props?.messagePayload?.otherUserData.image} alt="chat-user" />
                                            <span className="absolute w-4 h-4 bg-gray-400 rounded-full right-0 bottom-0 border-2 border-white"></span>
                                        </div>
                                    </div>
                                    <div className="flex-1 px-2">
                                        <div className="inline-block bg-gray-300 rounded-full p-2 px-6 text-gray-700">
                                            <span>{msgData.text}</span>
                                        </div>
                                        <div className="pl-4"><small className="text-gray-500">{msgData.timeStamp}</small></div>
                                    </div>
                                </div> : 
                                <div className="message me mb-4 flex text-right">
                                    <div className="flex-1 px-2">
                                        <div className="inline-block bg-blue-600 rounded-full p-2 px-6 text-white">
                                            <span>{msgData.text}</span>
                                        </div>
                                        <div className="pr-4"><small className="text-gray-500">{msgData.timeStamp}</small></div>
                                    </div>
                                </div>
                            }         
                        </div>    
                    )
                }
                
                
            </div>
            <div className="sticky bottom-24">
                <div className="write bg-white shadow flex rounded-lg">
                    <div className="flex-3 flex content-center items-center text-center p-2 pr-0">
                        <span className="block text-center text-gray-400 hover:text-gray-800">
                            <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24" className="h-6 w-6"><path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </span>
                    </div>
                    <div className="flex-1">
                        <textarea name="message" ref={msg} className="w-full block outline-none py-2 px-2 bg-transparent" placeholder="Type a message..."></textarea>
                    </div>
                    <div className="flex-2 w-32 p-2 flex content-center items-center">
                        <div className="flex-1 text-center">
                            <span className="text-gray-400 hover:text-gray-800">
                                <span className="inline-block align-text-bottom">
                                    <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
                                </span>
                            </span>
                        </div>
                        <div className="flex-1">
                            <button className="bg-blue-400 w-10 h-10 rounded-full inline-block" onClick={() => sendMessage()}>
                                <span className="inline-block align-text-bottom">
                                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" className="w-4 h-4 text-white"><path d="M5 13l4 4L19 7"></path></svg>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MessageArea;