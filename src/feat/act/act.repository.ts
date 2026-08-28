// @/feat/act/act.repository.ts

import "server-only";
import { diffLines } from "diff";

import { supabase } from "@/lib/supabase";
import type { Action } from "@/types/act.type";

export async function findActs(
  documentId: string
): Promise<Action[]> {
  const { data, error } = await supabase
    .from("document_actions")
    .select("*")
    .eq("document_id", documentId)
    .order("version", { ascending: false });

  if (error) { throw error; }
  return data;
}

export async function findActByDnV(
  documentId: string,
  version: number
): Promise<Action | null> {
  const { data, error } = await supabase
    .from("document_actions")
    .select("*")
    .eq("document_id", documentId)
    .eq("version", version)
    .maybeSingle();

  if (error) { throw error; }
  return data;
}

export async function findLatestAct(
  documentId: string
): Promise<Action | null> {
  const { data, error } = await supabase
    .from("document_actions")
    .select("*")
    .eq("document_id", documentId)
    .order("version", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) { throw error; }
  return data;
}

export async function insertAct(
  documentId: string,
  userId: string,
  content: string,
): Promise<Action> {
  const latest = await findLatestAct(documentId);

  const previousContent = latest?.content ?? "";
  const expectedVersion = latest?.version ?? 0;

  const diff = diffLines(previousContent, content);
  let additions = 0;
  let deletions = 0;
  for (const part of diff) {
    if (part.added) { additions += part.count ?? 0; }
    if (part.removed) { deletions += part.count ?? 0; }
  }

  const { data, error } = await supabase.rpc(
    "insert_document_action",
    {
      p_document_id: documentId,
      p_user_id: userId,
      p_expected_version: expectedVersion,
      p_content: content,
      p_additions: additions,
      p_deletions: deletions,
    }
  );

  if (error) { throw error; }
  return data;
}
