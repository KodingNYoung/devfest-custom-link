import { StorageKeys } from "@/utils/enums";
import { useCallback, useEffect, useMemo, useState } from "react";

export const useStorage = <T = unknown>(
  key: StorageKeys,
  fallback: T | null = null
) => {
  const [_value, setValue] = useState<T | null>();

  const set = useCallback(
    (value: T) => {
      if (typeof window === "undefined") return;
      if (value === _value) {
        return;
      }
      setValue(value ?? fallback);
      if (value !== null) {
        localStorage.setItem(key, JSON.stringify(value));
      } else if (fallback !== null) {
        localStorage.setItem(key, JSON.stringify(fallback));
      } else if (fallback === null) {
        localStorage.removeItem(key);
      }
    },
    [_value, key, fallback]
  );

  const refetch = useCallback(() => {
    const inStorageValue = localStorage.getItem(key);
    try {
      if (inStorageValue) {
        const parsedValue = JSON.parse(inStorageValue) as T;
        setValue(parsedValue);
      } else {
        throw new Error();
      }
    } catch {
      setValue(fallback);
    }
  }, [fallback, key]);

  useEffect(() => {
    if (typeof window !== "undefined") refetch();
  }, [key, fallback, refetch]);

  return useMemo(
    () => ({
      data: _value,
      set,
      refetch,
    }),
    [_value, set, refetch]
  );
};
