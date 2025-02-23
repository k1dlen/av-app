import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { login, password, full_name, phone, email } = await req.json();
    await db.query(
      'INSERT INTO user (login, password, full_name, phone, email, id_role) VALUES (?, ?, ?, ?, ?, ?)',
      [login, password, full_name, phone, email, 1]
    );
    return NextResponse.json({ message: 'Пользователь зарегистрирован' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Ошибка при регистрации' }, { status: 500 });
  }
}
