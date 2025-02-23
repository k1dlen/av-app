import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req) {
    const { id_order, newStatus, id_role } = await req.json();
  
    if (id_role !== 2) {
      return NextResponse.json({ error: 'Доступ запрещён' }, { status: 403 });
    }
  
    await db.query('UPDATE `order` SET id_status = ? WHERE id = ?', [newStatus, id_order]);
    return NextResponse.json({ message: 'Статус обновлен', id_order, newStatus });
  }
  