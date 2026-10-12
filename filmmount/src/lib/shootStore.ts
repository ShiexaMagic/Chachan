import { useSyncExternalStore } from 'react';
import { sampleShoots } from '../data/sampleShoots';
import type { Shoot } from '../types';

const KEY = 'filmmount.shoots.v1';
const listeners = new Set<() => void>();

function readUserShoots(): Shoot[] {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as unknown) : [];
    return Array.isArray(parsed) ? (parsed as Shoot[]) : [];
  } catch {
    return [];
  }
}

let userShoots: Shoot[] = readUserShoots();
let snapshot: Shoot[] = [...userShoots, ...sampleShoots];

function commit(next: Shoot[]) {
  userShoots = next;
  snapshot = [...userShoots, ...sampleShoots];
  try {
    localStorage.setItem(KEY, JSON.stringify(userShoots));
  } catch {
    /* storage unavailable — keep in memory for this session */
  }
  listeners.forEach((l) => l());
}

export function addShoot(shoot: Shoot) {
  commit([shoot, ...userShoots]);
}

export function resetShoots() {
  commit([]);
}

export function newShootId(): string {
  const n = 500 + userShoots.length + Math.floor(Math.random() * 400);
  return `FM-2026-${String(n).padStart(4, '0')}`;
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function useShoots(): Shoot[] {
  return useSyncExternalStore(subscribe, () => snapshot);
}

export function userShootCount(): number {
  return userShoots.length;
}
