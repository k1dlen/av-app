// app/api/products/route.js
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const [products] = await db.query("SELECT * FROM `product`");

  return NextResponse.json({ products });
}
