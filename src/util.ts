export const createRange = (last: number, first = 1) =>
  Array(last)
    .fill(null)
    .map((_, index) => index + first)
