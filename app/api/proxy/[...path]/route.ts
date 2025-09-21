import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BASE = process.env.INTERNAL_API_BASE!;

async function handler(req: NextRequest, params: { path: string[] }) {
  console.log("INTERNAL_API_BASE =", process.env.INTERNAL_API_BASE);

  const sub = "/" + (params.path?.join("/") ?? "");
  const url = new URL(sub + req.nextUrl.search, BASE);

  const method = req.method;
  const hasBody = !["GET", "HEAD"].includes(method);
  const bodyText = hasBody ? await req.text() : undefined;

  try {
    const upstream = await fetch(url, {
      method,
      headers: (() => {
        const h = new Headers();
        for (const k of ["content-type", "authorization", "cookie", "accept"]) {
          const v = req.headers.get(k);
          if (v) h.set(k, v);
        }
        if (bodyText !== undefined) {
          h.set("content-length", Buffer.byteLength(bodyText).toString());
        }
        return h;
      })(),
      body: bodyText, // ✅ 문자열/버퍼로 전달(duplex 불필요)
      cache: "no-store",
      redirect: "manual",
      signal: AbortSignal.timeout(15000),
    });

    // 디버깅
    if (process.env.NODE_ENV !== "production") {
      console.log("[PROXY]", method, url.toString(), upstream.status);
      if (!upstream.ok) {
        const errTxt = await upstream.text().catch(() => "");
        console.error("[UPSTREAM ERROR BODY]", errTxt);
        return new Response(errTxt || "Upstream error", {
          status: upstream.status,
          headers: { "content-type": upstream.headers.get("content-type") ?? "text/plain" },
        });
      }
    }

    const headers = new Headers(upstream.headers);
    headers.delete("server");
    headers.delete("via");
    return new Response(upstream.body, { status: upstream.status, headers });
  } catch (e: any) {
    console.error("[PROXY CATCH]", method, url.toString(), e?.name || e, e?.message);
    const msg =
      e?.name === "TimeoutError" || e?.name === "AbortError" ? "Upstream timeout" : "Proxy error";
    return new Response(JSON.stringify({ message: msg }), {
      status: 502,
      headers: { "content-type": "application/json" },
    });
  }
}

export const GET = (req: NextRequest, ctx: { params: { path: string[] } }) =>
  handler(req, ctx.params);
export const POST = GET;
export const PUT = GET;
export const PATCH = GET;
export const DELETE = GET;
export const HEAD = GET;
