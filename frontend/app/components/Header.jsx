'use client';
import { useLogoutUserMutation } from '@/redux/api/apiSlice';
import { logoutUser } from '@/redux/features/user/userSlice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {toast} from 'react-toastify';

const Header = () => {
  const user = useSelector((state) => state.userState.user);
  const [logoutUser] = useLogoutUserMutation();
  const router = useRouter(); 

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      toast.success('logout successful!');
      router.push('/'); // Redirect to home or any other page
    }
    catch(err){
      toast.error('logout failed.Might be Server Error,  Please try again.');
      
    } 
  };
  return (
    <header className='bg-neutral py-2 text-neutral-content'>
      <div className='align-element flex justify-center sm:justify-end'>
        {user ? (
          <div className='flex gap-x-2 sm:gap-x-8 items-center'>
            <p className='text-xs sm:text-sm'>👋 Hello {user.username}</p>
            <button
              className='btn btn-xs btn-default mr-2'
              onClick={handleLogout}
            >
              logout
            </button>
          </div>
        ) : (
          <div className='flex gap-x-6 justify-center items-center'>
            <Link href='/login' className='link link-hover text-xs sm:text-sm'>
              Sign in / Guest
            </Link>
            <Link href='/register' className='link link-hover text-xs sm:text-sm'>
              Create Account
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;
