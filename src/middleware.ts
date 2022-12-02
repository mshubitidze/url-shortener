import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (req.nextUrl.pathname.startsWith("/api/get-url")) {
    // console.log("returning early");

    return;
  }

  // console.log("Path??", req.nextUrl.pathname);

  const slug = req.nextUrl.pathname.split("/").pop();

  // console.log("full next url", req.nextUrl);
  //
  const jsonData = await fetch(`${req.nextUrl.origin}/api/get-url/${slug}`);

  const data = typeof jsonData === "object" ? await jsonData.json() : null;

  if (data?.url) {
    return NextResponse.redirect(data.url);
  }

  // console.log("data =>>>", data);
}
