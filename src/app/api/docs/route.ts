import { NextResponse } from "next/server";

import { createDocs } from "@/feat/docs/docs.service";

type RequestBody = { slug?: unknown; content?: unknown; };
export async function POST( request: Request ) {
  let body: RequestBody;
  try { body = await request.json(); }
  catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  if (typeof body.slug !== "string" || typeof body.content !== "string" ) {
    return NextResponse.json(
      { error: "slug and content must be strings" },
      { status: 400, }
    );
  }

  try {
    const document =
      await createDocs(body.slug, body.content);
    return NextResponse.json(
      document,
      { status: 201, }
    );
  } catch (error) {
    console.error("Failed to create document:", error );
    return NextResponse.json(
      { error: "Failed to create document" },
      { status: 500 },
    );
  }
}
