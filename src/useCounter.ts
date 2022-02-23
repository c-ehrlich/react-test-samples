import { useState, useCallback, useMemo } from "react";

export function useCounter() {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => setCount((x) => x + 1), [])
  // OT but whatever
  // useCallback is just useMemo of a function but easier to read
  // const incrementMemo = useMemo(() => () => setCount((x) => x + 1), [])

  return { count, increment };
}