import {
  floor,
  ceil,
  round,
  trunc,
  getRadian,
  getDegree,
  getRandom
} from './mathUtil'

describe('mathUtil: テスト', () => {
  // getRandom: 乱数テスト
  test('getRandom: 乱数テスト: 1..=10', () => {
    const min = 1
    const max = 10
    const target = getRandom({ min, max })
    expect(min <= target && target <= max).toBe(true)
  })

  test('getRandom: 乱数テスト: 0..=1', () => {
    const min = 0
    const max = 1
    const target = getRandom({ min, max })
    expect(min <= target && target <= max).toBe(true)
  })

  test('getRandom: 乱数テスト: 30..=40', () => {
    const min = 30
    const max = 40
    const target = getRandom({ min, max })
    expect(min <= target && target <= max).toBe(true)
  })

  test('getRandom: 乱数テスト: 1..=1', () => {
    const min = 1
    const max = 1
    const target = getRandom({ min, max })
    expect(min <= target && target <= max).toBe(true)
  })

  // floor（切り捨て） テスト
  test('floor（切り捨て） テスト: 100.1112の小数点第3桁まで切り捨て = 100.111', () => {
    expect(floor({ n: 100.1112, d: 3 })).toBe(100.111)
  })
  test('floor（切り捨て） テスト: 16.345の小数点第0桁まで切り捨て = 16', () => {
    expect(floor({ n: 16.345, d: 0 })).toBe(16)
  })
  test('floor（切り捨て） テスト: 21.8345の小数点第1桁まで切り捨て = 21.8', () => {
    expect(floor({ n: 21.8345, d: 1 })).toBe(21.8)
  })
  test('floor（切り捨て） テスト: 231.56872の小数点第4桁まで切り捨て = 231.5687', () => {
    expect(floor({ n: 231.56872, d: 4 })).toBe(231.5687)
  })

  // ceil（切り上げ） テスト
  test('ceil（切り上げ） テスト: 100.1112の小数点第3桁まで切り上げ = 100.112', () => {
    expect(ceil({ n: 100.1112, d: 3 })).toBe(100.112)
  })
  test('ceil（切り上げ） テスト: 16.345の小数点第0桁まで切り上げ = 17', () => {
    expect(ceil({ n: 16.345, d: 0 })).toBe(17)
  })
  test('ceil（切り上げ） テスト: 21.8345の小数点第1桁まで切り上げ = 21.9', () => {
    expect(ceil({ n: 21.8345, d: 1 })).toBe(21.9)
  })
  test('ceil（切り上げ） テスト: 231.56872の小数点第4桁まで切り上げ = 231.5688', () => {
    expect(ceil({ n: 231.56872, d: 4 })).toBe(231.5688)
  })

  // round（四捨五入） テスト
  test('round（四捨五入） テスト: 100.1112の小数点第3桁まで四捨五入 = 100.111', () => {
    expect(round({ n: 100.1112, d: 3 })).toBe(100.111)
  })
  test('round（四捨五入） テスト: 16.345の小数点第0桁まで四捨五入 = 16', () => {
    expect(round({ n: 16.345, d: 0 })).toBe(16)
  })
  test('round（四捨五入） テスト: 21.8345の小数点第1桁まで四捨五入 = 21.8', () => {
    expect(round({ n: 21.8345, d: 1 })).toBe(21.8)
  })
  test('round（四捨五入） テスト: 231.56872の小数点第4桁まで四捨五入 = 231.5687', () => {
    expect(round({ n: 231.56872, d: 4 })).toBe(231.5687)
  })

  // trunc（整数を取得） テスト
  test('trunc（整数を取得） テスト: 100.1112の整数部分を取得 = 100', () => {
    expect(trunc({ n: 100.1112 })).toBe(100)
  })
  test('trunc（整数を取得） テスト: 16.345の整数部分を取得 = 16', () => {
    expect(trunc({ n: 16.345 })).toBe(16)
  })
  test('trunc（整数を取得） テスト: 21.8345の整数部分を取得 = 21', () => {
    expect(trunc({ n: 21.8345 })).toBe(21)
  })
  test('trunc（整数を取得） テスト: 231.56872の整数部分を取得 = 231', () => {
    expect(trunc({ n: 231.56872 })).toBe(231)
  })

  // 度からラジアンを取得する関数（getRadian）テスト
  test('getRadian_テスト: 0度 = 0', () => {
    expect(floor({ n: getRadian(0), d: 2 })).toBe(0)
  })
  test('getRadian_テスト: 30度 = 0.52', () => {
    expect(floor({ n: getRadian(30), d: 2 })).toBe(floor({ n: 0.523599, d: 2 }))
  })
  test('getRadian_テスト: 45度 = 0.78', () => {
    expect(floor({ n: getRadian(45), d: 2 })).toBe(floor({ n: 0.785398, d: 2 }))
  })
  test('getRadian_テスト: 90度 = 1.57', () => {
    expect(floor({ n: getRadian(90), d: 2 })).toBe(floor({ n: 1.5708, d: 2 }))
  })
  test('getRadian_テスト: 120度 = 2.09', () => {
    expect(floor({ n: getRadian(120), d: 2 })).toBe(floor({ n: 2.0944, d: 2 }))
  })
  test('getRadian_テスト: 180度 = 3.14', () => {
    expect(floor({ n: getRadian(180), d: 2 })).toBe(floor({ n: 3.14159, d: 2 }))
  })
  test('getRadian_テスト: 215度 = 3.75', () => {
    expect(floor({ n: getRadian(215), d: 2 })).toBe(floor({ n: 3.75246, d: 2 }))
  })
  test('getRadian_テスト: 270度 = 4.71', () => {
    expect(floor({ n: getRadian(270), d: 2 })).toBe(floor({ n: 4.71239, d: 2 }))
  })
  test('getRadian_テスト: 315度 = 5.49', () => {
    expect(floor({ n: getRadian(315), d: 2 })).toBe(floor({ n: 5.49779, d: 2 }))
  })
  test('getRadian_テスト: 360度 = 6.28', () => {
    expect(floor({ n: getRadian(360), d: 2 })).toBe(floor({ n: 6.28319, d: 2 }))
  })

  // 度からラジアンを取得する関数（getDegree）テスト
  test('getDegree_テスト: 度 = 0', () => {
    expect(getDegree(0)).toBe(0)
  })
  test('getDegree_テスト: ラジアン:0.523599 = 30度', () => {
    expect(floor({ n: getDegree(0.523599), d: 0 })).toBe(floor({ n: 30, d: 1 }))
  })
  test.skip('getDegree_テスト: ラジアン:0.785398 = 45度', () => {
    expect(floor({ n: getDegree(0.785398), d: 0 })).toBe(floor({ n: 45, d: 1 }))
  })
  test('getDegree_テスト: ラジアン:1.5708 = 90度', () => {
    expect(floor({ n: getDegree(1.5708), d: 0 })).toBe(floor({ n: 90, d: 1 }))
  })
  test('getDegree_テスト: ラジアン:2.0944 = 120度', () => {
    expect(floor({ n: getDegree(2.0944), d: 0 })).toBe(floor({ n: 120, d: 1 }))
  })
  test.skip('getDegree_テスト: ラジアン:3.14159 = 180度', () => {
    expect(floor({ n: getDegree(3.14159), d: 0 })).toBe(floor({ n: 180, d: 1 }))
  })
  test('getDegree_テスト: ラジアン:3.75246 = 215度', () => {
    expect(floor({ n: getDegree(3.75246), d: 0 })).toBe(floor({ n: 215, d: 1 }))
  })
  test('getDegree_テスト: ラジアン:4.71239 = 270度', () => {
    expect(floor({ n: getDegree(4.71239), d: 0 })).toBe(floor({ n: 270, d: 1 }))
  })
  test('getDegree_テスト: ラジアン:5.49779 = 315度', () => {
    expect(floor({ n: getDegree(5.49779), d: 0 })).toBe(floor({ n: 315, d: 1 }))
  })
  test('getDegree_テスト: ラジアン:6.28319 = 360度', () => {
    expect(floor({ n: getDegree(6.28319), d: 0 })).toBe(floor({ n: 360, d: 1 }))
  })
})
