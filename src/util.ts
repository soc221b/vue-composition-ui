export const createRange = (last: number, first = 1) =>
  Array(last - first + 1)
    .fill(null)
    .map((_, index) => index + first)

export const noop = (..._: any): any => {}
