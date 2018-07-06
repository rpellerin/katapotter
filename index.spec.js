describe('Baskets', () => {
  it('[] costs 0 euros', () => {
    expect(baskets([])).toBe(0)
  })
})

describe('Baskets of 1 item', () => {
  it('[1] costs 8euros', () => {
    expect(baskets([1])).toBe(8)
  })
})

describe('Baskets of several similar items', () => {
  it('[1, 1] costs 16 euros', () => {
    expect(baskets([1, 1])).toBe(16)
  })
  it('[1, 1, 1, 1] costs 32 euros', () => {
    expect(baskets([1, 1, 1, 1])).toBe(32)
  })
})

describe('Baskets of several unique items', () => {
  it('[1, 2] costs 15.2 euros', () => {
    expect(baskets([1, 2])).toBe(15.2)
  })
  it('[1 ,2, 3] costs 21.6 euros', () => {
    expect(baskets([1, 2, 3])).toBe(21.6)
  })
  it('[1, 2, 3, 4] costs 25.6 euros', () => {
    expect(baskets([1, 2, 3, 4])).toBe(25.6)
  })
  it('[1, 2, 3, 4, 5] costs 30 euros', () => {
    expect(baskets([1, 2, 3, 4, 5])).toBe(30)
  })
})

describe('Baskets of various combinations', () => {
  it('[1, 1, 2] costs 23.2 euros', () => {
    expect(baskets([1, 1, 2])).toBe(23.2)
  })
  it('[1, 2, 3, 4, 5, 1, 2] costs 45.2 euros', () => {
    expect(baskets([1, 2, 3, 4, 5, 1, 2])).toBe(45.2)
  })
  it('[4, 2, 5, 1, 1, 2, 3, 4] costs 51.2 euros', () => {
    expect(baskets([4, 2, 5, 1, 1, 2, 3, 4])).toBe(51.2)
  })
})

describe('Return unique sets', () => {
  it('returns an empty array of unique sets', () => {
    expect(findUniqueSets([])).toEqual([])
  })
  it('returns an array of unique sets based on [1, 1, 2]', () => {
    expect(findUniqueSets([1, 1, 2])).toEqual(
      expect.arrayContaining([[1], [1, 2]])
    )
  })
  it('returns an array of unique sets based on [1, 1, 2, 3, 1]', () => {
    expect(findUniqueSets([1, 1, 2, 3, 1])).toEqual(
      expect.arrayContaining([[1], [1], [1, 2, 3]])
    )
  })
  it('returns arrays of unique sets based on complex arrays', () => {
    expect(findUniqueSets([4, 2, 5, 1, 1, 2, 3, 4])).toEqual(
      expect.arrayContaining([
        expect.arrayContaining([1, 2, 4, 5]),
        expect.arrayContaining([1, 2, 3, 4])
      ])
    )
    expect(findUniqueSets([1, 4, 2, 5, 1, 1, 2, 3, 4])).toEqual(
      expect.arrayContaining([
        expect.arrayContaining([1, 2, 4, 5]),
        expect.arrayContaining([1, 2, 3, 4]),
        expect.arrayContaining([1])
      ])
    )
    expect(findUniqueSets([1, 2, 3, 4, 5, 1, 2])).toEqual(
      expect.arrayContaining([
        expect.arrayContaining([1, 2, 3, 4, 5]),
        expect.arrayContaining([1, 2])
      ])
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

const findUniqueSets = books => {
  let nbOfOccurencesSorted = books
    .reduce((acc, bookNumber) => {
      acc[bookNumber - 1] = acc[bookNumber - 1] || {
        bookNumber,
        occurrences: 0
      }
      acc[bookNumber - 1].occurrences += 1
      return acc
    }, [])
    .sort((a, b) => b.occurrences - a.occurrences)

  const maxNumberOfUniqueSets = nbOfOccurencesSorted[0]
    ? nbOfOccurencesSorted[0].occurrences
    : 0

  const uniqueSets = new Array(maxNumberOfUniqueSets)

  for (let i = 0; i < nbOfOccurencesSorted.length; i++) {
    const item = nbOfOccurencesSorted[i]
    if (i === 0) {
      for (let j = 0; j < maxNumberOfUniqueSets; j++) {
        uniqueSets[j] = [item.bookNumber]
      }
      continue
    }
    let toDispatch = item.occurrences
    const tmpArray = [...uniqueSets].sort(
      (a, b) =>
        a.length === 3 && b.length !== 0
          ? -1
          : a.length !== 0 && b.length === 3 ? 1 : b.length - a.length
    )
    tmpArray.forEach(arr => {
      if (toDispatch > 0) {
        arr.push(item.bookNumber)
        toDispatch--
      }
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
