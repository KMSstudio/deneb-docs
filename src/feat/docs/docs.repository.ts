// @/feat/docs/docs.repository.ts

import "server-only";
import { supabase } from "@/lib/supabase";
import type { Document } from "@/types/docs.type";

export async function findDocsBySlug(
  slug: string
): Promise<Document | null> {
  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) { throw error; }
  return data;
}

export async function insertDocs(
  slug: string,
  content: string,
  creatorId: string,
): Promise<Document> {
  const { data, error } = await supabase
    .from("documents")
    .insert({
      slug,
      content,
      creator_id: creatorId,
      updater_id: creatorId,
    })
    .select()
    .single();

  if (error) { throw error; }
  return data;
}

export async function updateDocs(
  slug: string,
  content: string,
  updaterId: string,
): Promise<Document | null> {
  const { data, error } = await supabase
    .from("documents")
    .update({
      content,
      updater_id: updaterId,
      updated_at: new Date().toISOString(),
    })
    .eq("slug", slug)
    .select()
    .maybeSingle();

  if (error) { throw error; }
  return data;
}
