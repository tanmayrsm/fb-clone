import Image from 'next/image'
import React from 'react'
import MessageArea from './MessageArea'
import MessagingList from './MessagingList'

const Messaging = () => {
  return (
        <div className="w-screen h-screen">
        <div className="flex h-full w-full">
            <div className="flex-1 bg-gray-100 w-full h-full">
                <div className="main-body container m-auto w-11/12 h-full flex flex-col">
                    <MessagingList />
                    <MessageArea />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Messaging
