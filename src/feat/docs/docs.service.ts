// @/feat/docs/docs.service.ts

import "server-only";
import {
  findDocsBySlug,
  insertDocs,
  updateDocs,
} from "./docs.repository";

const ACTOR_ID = process.env.POC_ACTOR_ID || "";
if (!ACTOR_ID) { throw new Error("POC_ACTOR_ID is not defined"); }

function prepareDocs(slug: string, content: string) {
  const cleanSlug = slug.trim();
  const cleanContent = content.replace(/\r\n?/g, "\n");
  if (!cleanSlug) { throw new Error("Slug is required"); }
  if (cleanSlug.length > 200) { throw new Error("Slug is too long"); }
  if (Buffer.byteLength(cleanContent, "utf8") > 5_000_000) {
    throw new Error("Content is too large");
  }
  return { slug: cleanSlug, content: cleanContent };
}

export async function getDocsBySlug(slug: string) {
  return findDocsBySlug(slug.trim());
}

export async function createDocs(slug: string, content: string) {
  const docs = prepareDocs(slug, content);
  if (await findDocsBySlug(docs.slug)) { throw new Error("Docs already exists"); }
  return insertDocs(docs.slug, docs.content, ACTOR_ID);
}

export async function updateDocsBySlug(slug: string, content: string) {
  const docs = prepareDocs(slug, content);
  if (!await findDocsBySlug(docs.slug)) { throw new Error("Docs not found"); }
  const updated = await updateDocs(docs.slug, docs.content, ACTOR_ID);
  if (!updated) { throw new Error("Docs not found"); }
  return updated;
}

export async function saveDocs(slug: string, content: string) {
  const docs = prepareDocs(slug, content);
  const exists = await findDocsBySlug(docs.slug);
  if (exists) {
    const updated = await updateDocs(docs.slug, docs.content, ACTOR_ID);
    if (!updated) { throw new Error("Docs not found"); }
    return { docs: updated, created: false };
  } else {
    const created = await insertDocs(docs.slug, docs.content, ACTOR_ID);
    return { docs: created, created: true };
  }
}
