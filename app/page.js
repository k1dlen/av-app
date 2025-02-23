'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Login from './components/Login';
import Register from './components/Register';

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      router.push(parsedUser.id_role === 2 ? '/admin' : '/orders');
    }
  }, []);

  return (
    <div>
      {!user ? (
        <div>
          {showRegister ? (
            <Register setUser={setUser} />
          ) : (
            <Login setUser={setUser} />
          )}
          <button onClick={() => setShowRegister(!showRegister)}>
            {showRegister ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
          </button>
        </div>
      ) : (
        <p>Перенаправление...</p>
      )}
    </div>
  );
}
