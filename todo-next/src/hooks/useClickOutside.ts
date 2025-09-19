"use client";

import { RefObject, useEffect } from "react";

export function useClickOutside<T extends HTMLElement>(ref: RefObject<T>, onOutside: () => void) {
  useEffect(() => {
    function handle(e: MouseEvent) {
      const el = ref.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) onOutside();
    }
    document.addEventListener("click", handle);
    return () => document.removeEventListener("click", handle);
  }, [ref, onOutside]);
}


