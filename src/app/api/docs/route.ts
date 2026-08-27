// @/api/docs/route.ts

import { NextResponse } from "next/server";
import { saveDocs } from "@/feat/docs/docs.service";

type RequestBody = { slug?: unknown; content?: unknown };

export async function POST(request: Request) {
  let body: RequestBody;

  try { body = await request.json(); }
  catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  if (typeof body.slug !== "string" || typeof body.content !== "string") {
    return NextResponse.json(
      { error: "slug and content must be strings" },
      { status: 400 },
    );
  }

  try {
    const { docs, created } = await saveDocs(body.slug, body.content);
    return NextResponse.json(docs, { status: created ? 201 : 200 });
  } catch (error) {
    console.error("Failed to save docs:", error);
    return NextResponse.json(
      { error: "Failed to save docs" },
      { status: 500 },
    );
  }
}
