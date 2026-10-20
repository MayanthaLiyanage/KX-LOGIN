import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return new NextResponse(
    JSON.stringify({
      status: "online",
      timestamp: Date.now(),
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    }
  );
}
