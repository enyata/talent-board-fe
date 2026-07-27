import { env } from "@/lib/env";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const url = req.nextUrl.searchParams.get("url");

    if (!url) {
        return NextResponse.json({ message: "Missing url param" }, { status: 400 });
    }

    let target: URL;
    try {
        target = new URL(url);
    } catch {
        return NextResponse.json({ message: "Invalid url param" }, { status: 400 });
    }

    const apiUrl = env("apiUrl");
    if (!apiUrl || target.origin !== new URL(apiUrl).origin) {
        return NextResponse.json({ message: "URL host not allowed" }, { status: 400 });
    }

    const upstream = await fetch(target, { cache: "no-store" });
    if (!upstream.ok || !upstream.body) {
        return NextResponse.json({ message: "Failed to fetch image" }, { status: upstream.status || 502 });
    }

    return new NextResponse(upstream.body, {
        headers: {
            "Content-Type": upstream.headers.get("Content-Type") || "application/octet-stream",
            "Cache-Control": "public, max-age=3600",
        },
    });
}
