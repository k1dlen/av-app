'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register({ setUser }) {
  const [formData, setFormData] = useState({
    login: '',
    password: '',
    full_name: '',
    phone: '',
    email: '',
  });

  const router = useRouter();

  async function handleRegister(e) {
    e.preventDefault();

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      const loginRes = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ login: formData.login, password: formData.password }),
      });

      if (loginRes.ok) {
        const { user } = await loginRes.json();
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        router.push(user.id_role === 2 ? '/admin' : '/orders');
      }
    }
  }

  return (
    <form onSubmit={handleRegister}>
      <input type="text" placeholder="Логин" value={formData.login} onChange={(e) => setFormData({ ...formData, login: e.target.value })} />
      <input type="password" placeholder="Пароль" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
      <input type="text" placeholder="ФИО" value={formData.full_name} onChange={(e) => setFormData({ ...formData, full_name: e.target.value })} />
      <input type="text" placeholder="Телефон" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
      <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
      <button type="submit">Зарегистрироваться</button>
    </form>
  );
}
