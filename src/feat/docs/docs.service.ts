// @/feat/docs/docs.service.ts

import "server-only";

import {
  findDocsBySlug,
  insertDocs,
  updateDocs,
} from "./docs.repository";

const POC_ACTOR_ID = process.env.POC_ACTOR_ID || "";
if (!POC_ACTOR_ID) { throw new Error("POC_ACTOR_ID is not defined"); }

function checkDocs(slug: string, content: string) {
  const cleanSlug = slug.trim();
  if (!cleanSlug) { throw new Error("Slug is required"); }
  if (cleanSlug.length > 200) { throw new Error("Slug is too long"); }
  if (Buffer.byteLength(content, "utf8") > 5_000_000) {
    throw new Error("Content is too large");
  }
  return cleanSlug;
}

export async function getDocsBySlug(slug: string) {
  return findDocsBySlug(slug);
}

export async function createDocs(slug: string, content: string) {
  const cleanSlug = checkDocs(slug, content);
  const exists = await findDocsBySlug(cleanSlug);
  if (exists) { throw new Error("Docs already exists"); }
  return insertDocs(cleanSlug, content, POC_ACTOR_ID);
}

export async function updateDocsBySlug(slug: string, content: string) {
  const cleanSlug = checkDocs(slug, content);
  const exists = await findDocsBySlug(cleanSlug);
  if (!exists) { throw new Error("Docs not found"); }
  const docs = await updateDocs(cleanSlug, content, POC_ACTOR_ID);
  if (!docs) { throw new Error("Docs not found"); }
  return docs;
}
