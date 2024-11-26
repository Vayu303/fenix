import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    MONGO_URI: process.env.MONGO_URI,
  });
}
