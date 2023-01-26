/**
 * 任意の時間待機するための関数
 *
 * @param {number} time - 待機する時間（ミリ秒）
 * @return {Promise} - 待機を実現するためにsetTimeoutをPromiseでラップする
 */
export const sleep = (time: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(0)
    }, time)
  })
}
