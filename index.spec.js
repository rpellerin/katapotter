describe('Baskets', () => {
  it('is empty', () => {
    expect(baskets([])).toBe(0)
  })
})

describe('Baskets of 1 item', () => {
  it('costs 8euros', () => {
    expect(baskets([1])).toBe(8)
  })
})

describe('Baskets of several similar items', () => {
  it('costs 32 euros', () => {
    expect(baskets([1, 1, 1, 1])).toBe(32)
  })
  it('costs 16 euros', () => {
    expect(baskets([1, 1])).toBe(16)
  })
})

describe('Baskets of several unique items', () => {
  it('costs 15.2 euros', () => {
    expect(baskets([1, 2])).toBe(15.2)
  })
  it('costs 21.6 euros', () => {
    expect(baskets([1, 2, 3])).toBe(21.6)
  })
  it('costs 25.6 euros', () => {
    expect(baskets([1, 2, 3, 4])).toBe(25.6)
  })
  it('costs 30 euros', () => {
    expect(baskets([1, 2, 3, 4, 5])).toBe(30)
  })
})

describe('Baskets of various combinations', () => {
  it('costs 23.2 euros', () => {
    expect(baskets([1, 1, 2])).toBe(23.2)
  })
})

describe('Return unique sets', () => {
  it('returns an array of unique sets', () => {
    expect(findUniqueSets([1, 1, 2])).toEqual(
      expect.arrayContaining([[1], [1, 2]])
    )
  })
  it('returns an array of unique sets', () => {
    expect(findUniqueSets([1, 1, 2, 3, 1])).toEqual(
      expect.arrayContaining([[1], [1], [1, 2, 3]])
    )
  })
})

const DISCOUNTS = {
  0: 0,
  1: 1,
  2: 0.95,
  3: 0.9,
  4: 0.8,
  5: 0.75
}

const findUniqueSets = items => {
  let initialItems = [...items]
  const uniqueSets = []
  while (initialItems.length > 0) {
    let uniqueSet = Array.from(new Set(initialItems))
    uniqueSets.push(uniqueSet)
    initialItems = initialItems.filter((item, i) => {
      return !(
        uniqueSet.indexOf(item) !== -1 && initialItems.indexOf(item) === i
      )
    })
  }
  return uniqueSets
}

const baskets = items => {
  const uniqueSets = findUniqueSets(items)
  return uniqueSets.reduce(
    (price, set) => price + set.length * 8 * DISCOUNTS[set.length],
    0
  )
}
