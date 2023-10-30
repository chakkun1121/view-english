'use client';
import React from 'react';
import { auth } from '../../../firebase/client';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { FiLogIn } from 'react-icons/fi';

export function HeaderUserMenu() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  console.log(user?.user);
  return (
    <div className="flex flex-none items-center gap-2 p-4">
      {user ? (
        <>
          <img src={user.user.photoURL} className="flex-none w-10 h-10 rounded-full" />
          <p className="flex-1 hidden md:inline">{user.user.displayName}</p>
        </>
      ) : (
        <button
          onClick={() =>
            signInWithGoogle([
              'https://www.googleapis.com/auth/drive.appdata',
              'https://www.googleapis.com/auth/drive.file	',
            ])
          }
          className="flex items-center"
        >
          <FiLogIn className="flex-none" />
          <p className="hidden md:inline flex-1">ログイン</p>
        </button>
      )}
    </div>
  );
}
