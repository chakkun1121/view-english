'use client';
import React from 'react';
import { auth } from '../../../firebase/client';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';

export function HeaderUserMenu() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  console.log(user?.user);
  return (
    <div className="flex flex-none items-center gap-2 p-2">
      {user ? (
        <>
          <img src={user.user.photoURL} className="flex-none w-10 h-10 rounded-full" />
          <p className="flex-1">{user.user.displayName}</p>
        </>
      ) : (
        <button onClick={() => signInWithGoogle()}>ログイン</button>
      )}
    </div>
  );
}
