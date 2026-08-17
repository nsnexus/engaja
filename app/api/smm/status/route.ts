// app/api/smm/status/route.ts
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const API_URL = process.env.MACHINESMM_API_URL ?? "https://machinesmm.com/api/v2";
const API_KEY = process.env.MACHINESMM_API_KEY ?? "";

export async function POST(req: NextRequest) {
  const { orderId } = await req.json() as { orderId: number };

  const body = new URLSearchParams({
    key:    API_KEY,
    action: "status",
    order:  String(orderId),
  });

  const res  = await fetch(API_URL, {
    method:  "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body:    body.toString(),
  });

  const data = await res.json();
  return NextResponse.json(data);
}
