import cookies from 'js-cookie';

export const getAuthCookie = () => {
  const cookie = cookies.get('user');
  if (cookie) {
    return JSON.parse(cookie);
  }
  return null;
};

export const setAuthCookie = (user: any) => {
  cookies.set('user', JSON.stringify(user), {
    expires: 365, // 1 year
  });
};

export const removeAuthCookie = () => cookies.remove('user');
