/* eslint-disable no-unused-vars */
declare global {
  interface Window {
    ym?: (...args: unknown[]) => void
  }
}

export function trackCatalogEvent(goal: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined' || typeof window.ym !== 'function') {
    return
  }

  window.ym(107013655, 'reachGoal', goal, params)
}
