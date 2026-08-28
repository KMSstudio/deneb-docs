// @/feat/act/act.service.ts

import "server-only";
import {
  findActs,
  findActByDnV,
  findLatestAct,
} from "./act.repository";

export async function getActsByDocs(documentId: string) {
  return findActs(documentId);
}

export async function getAct(documentId: string, version: number) {
  return findActByDnV(documentId, version);
}

export async function getLatestAct(documentId: string) {
  return findLatestAct(documentId);
}
