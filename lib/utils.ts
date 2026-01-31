/**
 * Design system utilities.
 * Use for conditional classes, merging, or future animation/scroll helpers.
 */
export function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
