import * as R from 'ramda'

/**
 * @type {SampleUserType} ramdaのサンプルコードのためのデータ
 */
export type SampleUserType = {
  id: number
  name: string
  score: number
  age: number
}

/**
 * @type {SampleUserType[]} サンプルデータの配列
 */
const users: SampleUserType[] = [
  {
    id: 1,
    name: 'tanaka',
    score: 100,
    age: 20
  },
  {
    id: 2,
    name: 'sato',
    score: 80,
    age: 26
  },
  {
    id: 3,
    name: 'suzuki',
    score: 120,
    age: 28
  }
]

/**
 * ユーザー名を大文字に変換する
 *
 * @param {SampleUserType[]} users - ユーザー配列
 * @return {SampleUserType[]} - ユーザー名を大文字に変換後のユーザー配列
 */
export const convertNameUpperCase = (
  users: SampleUserType[]
): SampleUserType[] => {
  return users.map((user) => {
    return { ...user, name: user.name.toUpperCase() }
  })
}

/**
 * ユーザーのスコアに任意の数値を加算する
 *
 * @param {number} point - 加算する数値
 * @param {SampleUserType[]} users - ユーザー配列
 * @return {SampleUserType[]} - スコア加算後のユーザー配列
 */
export const addAnyPointForScore = (point: number) => {
  return (users: SampleUserType[]) => {
    return users.map((user) => {
      return { ...user, score: user.score + point }
    })
  }
}

/**
 * ユーザーの年齢を任意の数で乗算する
 *
 * @param {number} point - 乗算する数値
 * @param {SampleUserType[]} users - ユーザー配列
 * @return {SampleUserType[]} - 年齢乗算後のユーザー配列
 */
export const multiplyAgeByAnyPoint = (point: number) => {
  return (users: SampleUserType[]) => {
    return users.map((user) => {
      return { ...user, age: user.age * point }
    })
  }
}

/**
 * ramdajs のサンプル
 */
export const ramdaSample = () => {
  // 各関数を合成する
  const convert = R.compose(
    convertNameUpperCase,
    addAnyPointForScore(50),
    multiplyAgeByAnyPoint(2)
  )

  console.log('convert(users): ', convert(users))
}
