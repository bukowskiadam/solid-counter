const counterItem = "count";

export function saveCount(count: number): number {
  window.localStorage?.setItem(counterItem, count.toString());

  return count;
}

export function restoreCount(): number {
  return (
    Number.parseInt(window.localStorage?.getItem(counterItem) || "", 10) || 0
  );
}
