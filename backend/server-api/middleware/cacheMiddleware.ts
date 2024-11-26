import { NextResponse } from "next/server";

export async function middleware(req) {
  const res = NextResponse.next();
  res.headers.set("Cache-Control", "public, max-age=3600, immutable");
  return res;
}
