import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  const userId = new URL(req.url).searchParams.get("userId");

  const query = userId
    ? `
    SELECT 
      \`order\`.id, 
      \`order\`.id_user, 
      \`order\`.address, 
      \`order\`.count, 
      \`order\`.id_status, 
      status.name AS status_name, 
      product.name AS product_name
    FROM \`order\` 
    JOIN status ON \`order\`.id_status = status.id 
    JOIN product ON \`order\`.id_product = product.id 
    JOIN user ON \`order\`.id_user = user.id
    WHERE \`order\`.id_user = ?
    ORDER BY \`order\`.id
  `
    : `
    SELECT 
      \`order\`.id, 
      \`order\`.id_user, 
      \`order\`.address, 
      \`order\`.count, 
      \`order\`.id_status, 
      status.name AS status_name, 
      product.name AS product_name, 
      user.full_name 
    FROM \`order\` 
    JOIN status ON \`order\`.id_status = status.id 
    JOIN product ON \`order\`.id_product = product.id 
    JOIN user ON \`order\`.id_user = user.id
    ORDER BY \`order\`.id
  `;
  const [orders] = await db.query(query, userId ? [userId] : []);

  return NextResponse.json({ orders });
}

export async function POST(req) {
  const { id_user, id_product, count, address } = await req.json();

  const [result] = await db.query(
    "INSERT INTO `order` (id_user, id_status, id_product, count, address) VALUES (?, ?, ?, ?, ?)", 
    [id_user, 1, id_product, count, address]
  );

  const orderId = result.insertId;

  return NextResponse.json({ message: "Заказ создан", id: orderId }, { status: 201 });
}
