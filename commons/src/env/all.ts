import { GLOBAL_KEY } from "../constants"

export function allSettings(): Settings { return globalThis[GLOBAL_KEY] }

export function allCachings(): ICache[] { return allSettings().caching.distinct() }