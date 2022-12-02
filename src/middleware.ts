import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/api/get-url")) {
    return;
  }
  const url = req.nextUrl.clone();
  if (
    url.pathname.length === 9 &&
    url.pathname.startsWith("/") &&
    !url.pathname.includes("api")
  ) {
    const slug = req.nextUrl.pathname.split("/").pop();

    const jsonData = await fetch(`${req.nextUrl.origin}/api/get-url/${slug}`);

    const data = typeof jsonData === "object" ? await jsonData.json() : null;

    if (data?.url) {
      return NextResponse.redirect(data.url);
    }
  }
}
