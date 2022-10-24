import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { firebaseAuth } from '../firebase';
import { User } from 'firebase/auth';
import { getAuthCookie, removeAuthCookie, setAuthCookie } from './authCookie';

export const useUser = () => {
  const [user, setUser] = useState<User | null>();
  const router = useRouter();

  const logout = async () => {
    removeAuthCookie();
    return firebaseAuth
      .signOut()
      .then(() => {
        router.push('/login');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const cancelAuthListener = firebaseAuth.onIdTokenChanged(async (user) => {
      if (user) {
        setAuthCookie(user);
        setUser(user);
      } else {
        removeAuthCookie();
        setUser(null);
      }
    });

    const userFromCookie = getAuthCookie();
    if (!userFromCookie) {
      return;
    }
    setUser(userFromCookie);

    return () => cancelAuthListener();
  }, []);

  return { user, logout };
};
