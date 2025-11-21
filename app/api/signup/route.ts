import { NextResponse } from "next/server";
import { signup } from "@/lib/auth/signup";

export async function POST(req: any) {
  const body = await req.json();
  const result = await signup(body);
  return NextResponse.json(result);
}