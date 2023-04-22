import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import {getSession} from 'next-auth/react';
import Login from '@/components/Login'
import Feed from '@/components/Feed'
import RightSidebar from '@/components/RightSidebar'
import { useEffect, useState } from 'react'
import { createOrUpdateUser } from './api/service'
import Messaging from '@/components/Messaging/Messaging'

const inter = Inter({ subsets: ['latin'] })

export default function Home({session} : any) {
  const [showMessageScreen, setShowMessageScreen] = useState(false);

  useEffect(() => {
    if(session) {
      createOrUpdateUser({
        name : session.user.name, 
        email : session.user.email, 
        image : session.user.image
      });
    }
  }, [session]);

  if(!session)
    return <Login />;
  
  return (
    <div>
      <Head>
          <title>Fb clone</title>
          <meta name="description" content='Generated'></meta>
      </Head>
      <Header setShowMessage={setShowMessageScreen}/>
      <main className='flex bg-gray-100'>
        { showMessageScreen ? 
          <Messaging /> : 
          <>
            {/* left sidebar */}
            <Sidebar />
            {/* feeds */}
            <Feed />
            {/* right sidebar */}
            <RightSidebar />
          </>
        }
      </main>
    </div>
  )
};

export async function getServerSideProps(context: any) {
  const session = await getSession(context);  
  return  {
    props: {session}
  };
}
