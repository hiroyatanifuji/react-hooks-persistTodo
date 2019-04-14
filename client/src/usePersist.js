import { useEffect } from "react";

export const usePersistedContext = (context, key) => {
  const persistedContext = localStorage.getItem(key);
  return persistedContext ? JSON.parse(persistedContext) : context;
}

export const usePersistedReducer = ([state, dispatch], key) => {
  useEffect(() => localStorage.setItem(key, JSON.stringify(state)), [state]);
  return [state, dispatch];
}