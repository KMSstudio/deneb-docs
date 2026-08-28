// @/feat/docs/docs.service.ts

import "server-only";
import {
  findDocsBySlug,
  insertDocs,
  updateDocs,
} from "./docs.repository";
import { insertAct } from "@/feat/act/act.repository";

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
  const created = await insertDocs(docs.slug, docs.content, ACTOR_ID);
  await insertAct(created.id, ACTOR_ID, created.content);
  return created;
}

export async function updateDocsBySlug(slug: string, content: string) {
  const docs = prepareDocs(slug, content);
  const exists = await findDocsBySlug(docs.slug);
  if (!exists) { throw new Error("Docs not found"); }
  if (exists.content === docs.content) { return exists; }

  const updated = await updateDocs(docs.slug, docs.content, ACTOR_ID);
  if (!updated) { throw new Error("Docs not found"); }
  await insertAct(updated.id, ACTOR_ID, updated.content);
  return updated;
}

export async function saveDocs(slug: string, content: string) {
  const docs = prepareDocs(slug, content);
  const exists = await findDocsBySlug(docs.slug);

  if (exists) {
    if (exists.content === docs.content) { return { docs: exists, created: false }; }
    const updated = await updateDocs(docs.slug, docs.content, ACTOR_ID);
    if (!updated) { throw new Error("Docs not found"); }
    await insertAct(updated.id, ACTOR_ID, updated.content);
    return { docs: updated, created: false };
  } else {
    const created = await insertDocs(docs.slug, docs.content, ACTOR_ID);
    await insertAct(created.id, ACTOR_ID, created.content);
    return { docs: created, created: true };
  }
}
