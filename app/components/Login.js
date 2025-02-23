'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login({ setUser }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ login, password }),
    });

    if (res.ok) {
      const { user } = await res.json();
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      router.push(user.id_role === 2 ? '/admin' : '/orders');
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <input type="text" placeholder="Логин" value={login} onChange={(e) => setLogin(e.target.value)} />
      <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Войти</button>
    </form>
  );
}
