// import './globals.css'
"use client";

import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useSelector } from "react-redux";
import { useEffect, useState } from 'react';

const authenticatedRoutes = [
    '/dashboard/home',
    '/invoices',
    '/createInvoice'
]

export default function RequireAuth({ children }) {
    const [user, setUser] = useState({})
    const currentuser = useSelector((state) => state.userState.user);
    const pathname = usePathname();
    const router = useRouter()

    // console.log("currentuser : ", currentuser)
    useEffect(() => {
      if(!currentuser && authenticatedRoutes.includes(pathname)) {
        // toast.info('you need to login to access this page')
        router.push('/login')
      }
      
      if(currentuser) {
        setUser(currentuser)
      }
    },[currentuser, pathname, router])

    // if(!user?.email) return <Loading />

    return (
      <>
          {children}
      </>
    );
}
