/**
 * 乱数を生成する関数。<br/>
 * 最小値と最大値を引数にとり、整数を返す。<br/>
 * もし引数の最小値が最大値より小さい場合は、一律で最小値を返す。
 *
 * @param args - 乱数の最小値・最大値をまとめたオブジェクト
 * @param {number} args.min - 乱数の最小値
 * @param {number} args.max - 乱数の最大値
 * @return {number}
 */
export const getRandom: ({
  min,
  max
}: {
  min: number
  max: number
}) => number = ({ min = 0, max = 1 }) => {
  if (min > max) return min

  const _min = Math.ceil(min)
  const _max = Math.floor(max)
  return Math.floor(Math.random() * (_max - _min + 1) + _min)
}

/**
 * 引数nを任意の桁数dで切り捨てます
 *
 * @param args - 対象の数値と桁数をまとめたオブジェクト
 * @param {number} args.n - 切り捨て対象の数値。小数点以下を含む。[n]number
 * @param {number} args.d - 切り捨てする桁数。指定した桁数までで切り捨てる。[d]igit。
 * @return {number} - 切り捨てした後の数値
 */
export const floor = ({ n, d = 0 }: { n: number; d: number }) => {
  return Math.floor(n * Math.pow(10, d)) / Math.pow(10, d)
}

/**
 * 引数nを任意の桁数dで切り上げます
 *
 * @param args - 対象の数値と桁数をまとめたオブジェクト
 * @param {number} args.n - 切り上げ対象の数値。小数点以下を含む。[n]number
 * @param {number} args.d - 切り上げする桁数。指定した桁数までで切り上げる。[d]igit。
 * @return {number} - 切り上げ後の数値
 */
export const ceil = ({ n, d = 0 }: { n: number; d: number }) => {
  return Math.ceil(n * Math.pow(10, d)) / Math.pow(10, d)
}

/**
 * 引数nを任意の桁数dで四捨五入します
 *
 * @param args - 対象の数値と桁数をまとめたオブジェクト
 * @param {number} args.n - 四捨五入対象の数値。小数点以下を含む。[n]number
 * @param {number} args.d - 四捨五入する桁数。指定した桁数までで四捨五入する。[d]igit。
 * @return {number} - 四捨五入後の数値
 */
export const round = ({ n, d = 0 }: { n: number; d: number }) => {
  return Math.round(n * Math.pow(10, d)) / Math.pow(10, d)
}

/**
 * 引数nの整数部分のみを取得する
 *
 * @param args - 対象の数値をまとめたオブジェクト
 * @param {number} args.n - 対象の数値。小数点以下を含む。[n]number
 * @return {number} - 整数値
 */
export const trunc = ({ n }: { n: number }) => {
  return Math.trunc(n)
}

/**
 * 引数の角度からラジアンを取得する関数
 *
 * @param {number} d - 角度（度）。[d]egree
 * @return {number} - ラジアン
 */
export const getRadian = (d = 0) => d * (Math.PI / 180)

/**
 * 引数のラジアンから角度を取得する関数
 *
 * @param {number} r - ラジアン。[r]adian
 * @return {number} - 角度（度）
 */
export const getDegree = (r = 0) => (r * 180) / Math.PI
