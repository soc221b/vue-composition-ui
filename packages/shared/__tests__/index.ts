import { isRef, ref } from 'vue'
import { createRange, rotate } from '../src'

describe('createRange', () => {
  test('it should create range by computed ref', () => {
    expect(isRef(createRange(0, 5))).toBeTruthy()
  })

  test('it should create range from primitive number', () => {
    expect(createRange(0, 5).value).toEqual([0, 1, 2, 3, 4])
    expect(createRange(5, 0).value).toEqual([5, 4, 3, 2, 1])
    expect(createRange(5, 10).value).toEqual([5, 6, 7, 8, 9])
    expect(createRange(10, 5).value).toEqual([10, 9, 8, 7, 6])
  })

  test('it should create range from ref number', () => {
    expect(createRange(ref(0), ref(5)).value).toEqual([0, 1, 2, 3, 4])
  })

  test('it should be reactive', () => {
    const start = ref(0)
    const end = ref(5)
    const range = createRange(start, end)

    expect(range.value).toEqual([0, 1, 2, 3, 4])
    start.value = 2
    expect(range.value).toEqual([2, 3, 4])
    end.value = 7
    expect(range.value).toEqual([2, 3, 4, 5, 6])
  })
})

describe('rotate', () => {
  test('it should return computed ref', () => {
    expect(isRef(rotate([], 0))).toBeTruthy()
  })

  test('it should rotate left', () => {
    const array = [0, 1, 2, 3, 4]

    expect(rotate(array, 2).value).toEqual([2, 3, 4, 0, 1])
  })

  test('it should rotate right', () => {
    const array = [0, 1, 2, 3, 4]

    expect(rotate(array, -2).value).toEqual([3, 4, 0, 1, 2])
  })

  test('it should remain order if step is 0', () => {
    const array = [0, 1, 2, 3, 4]

    expect(rotate(array, 0).value).toEqual([0, 1, 2, 3, 4])
  })

  test('it should be reactive', () => {
    const array = ref([0, 1, 2, 3, 4])
    const rotatedArray = rotate(array, 2)

    expect(rotatedArray.value).toEqual([2, 3, 4, 0, 1])
    array.value = [4, 3, 2, 1, 0]
    expect(rotatedArray.value).toEqual([2, 1, 0, 4, 3])
  })
})
