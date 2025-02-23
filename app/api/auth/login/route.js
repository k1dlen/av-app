import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { login, password } = await req.json();
    const [users] = await db.query('SELECT * FROM user WHERE login = ? AND password = ?', [login, password]);

    if (users.length === 0) {
      return NextResponse.json({ error: 'Неверный логин или пароль' }, { status: 401 });
    }

    return NextResponse.json({ user: users[0] });
  } catch (error) {
    return NextResponse.json({ error: 'Ошибка авторизации' }, { status: 500 });
  }
}
