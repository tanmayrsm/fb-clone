import { getAllMessages, getUserById } from '@/pages/api/service'
import { MessagengerList } from '@/pages/interfaces'
import { selectUser } from '@/public/src/features/userSlice'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import MessageArea from './MessageArea'
import MessagingList from './MessagingList'

const Messaging = (props : {id : any}) => {
    const user = useSelector(selectUser);
    const [allMessages, setAllMessages] = useState<any>();
    const [messagedUsers, setMessagedUsersList] = useState<{[key: string] : MessagengerList}>();
    const [activatedChatId, setActivatedChatId] = useState<any>();
    const [activatedChatMapper, setActivatedChatMapper] = useState<any>({});

    useEffect(() => {
        // api call for all msg list for user
        const intervalId = setInterval(() => {
            refreshMesssageList();
        }, 3000);
        refreshMesssageList();
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        
        if(allMessages?.length > 0) {
            Promise.all(allMessages.map((res : any) => {
                let msgdUserDetails = res[0].msgFrom !== user.id ? res[0].msgFrom : res[0].msgTo;
                return getUserById(msgdUserDetails);
            })).then(userList => {
                const msgList: any = {};
                allMessages.forEach((rem : any, idx :any) => {
                    const lastMsg = rem.length - 1;
                    const userId = userList[idx].data.id;
                    setActivatedChatMapper((prev : any) => ({...prev, [userId] : {listData : [...rem], otherUserData : userList[idx].data}}))
                    msgList[userList[idx].data.id] = {
                        id : rem[lastMsg].id,
                        messengerUserId : userList[idx].data,
                        image : rem[lastMsg].image,
                        text : rem[lastMsg].text,
                        ts : rem[lastMsg].timeStamp 
                    };
                });
                if(!props.id && !activatedChatId) {
                    const firstMsg: any = allMessages[0][0];
                    setActivatedChatId(firstMsg.msgFrom != user.id ? firstMsg.msgFrom : firstMsg.msgTo);
                } else if(!activatedChatId) {
                    setActivatedChatId(props.id);
                }
                setMessagedUsersList(prev => ({...(prev ? prev : {}), ...msgList}));
            });
        } else if(props.id && allMessages) {   // current user havent msgd/received anyone previously
            setActivatedChatId(props.id);
        }
    }, [allMessages]);

    useEffect(() => {
        console.log("Activated chat Id ::", activatedChatMapper, activatedChatId);
        if(props.id && !activatedChatMapper[props.id] && allMessages) {
            // user is trying to chat for first time
            getUserById(props.id).then((res) => {
                setActivatedChatMapper((prev : any) => ({...prev, [props.id] : {listData : [], otherUserData : res.data}}));
                setMessagedUsersList(prev => ({...(prev ? prev : []), [props.id] : {
                    messengerUserId : res.data,
                    text : 'Say Hi to' + res.data.name,
                }}));
                    
            });
        }
    }, [activatedChatId]);

    const refreshMesssageList = () => {
        getAllMessages(user.id).then((res : any) => {
            setAllMessages(res.data);
        }).catch(err => {
            console.error("cant get any messages :: ", err);
        });
    }
    return (
            <div className="w-screen h-screen">
            <div className="flex h-full w-full">
                <div className="flex-1 bg-gray-100 w-full h-full">
                    <div className="main-body container m-auto w-11/12 h-full flex flex-col">
                        <div className="main flex-1 flex flex-col">
                            <div className="flex-1 flex h-full">
                                <MessagingList messageList={messagedUsers} setChatId={(param : any) => setActivatedChatId(param)} />
                                <MessageArea messagePayload={activatedChatMapper[activatedChatId]} />
                            </div>
                        </div>       
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Messaging
