// @/types/act.type.ts

export interface Action {
  id: string;
  document_id: string;
  user_id: string;
  version: number;
  content: string;
  additions: number;
  deletions: number;
  created_at: string;
}
