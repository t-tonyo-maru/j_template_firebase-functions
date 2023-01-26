type ResultMap<T> = Map<'data' | 'error', T | Error>

/**
 * Mapを利用して、擬似的なResult型を返す関数<br/>
 * 引数のfuncが成功すれば、返り値のMapオブジェクトのkey: dataにfuncの返り値が格納される<br/>
 * 引数のfuncが失敗すれば、返り値のMapオブジェクトのkey: errorにfuncのエラーオブジェクトが格納される<br/>
 * 上記のようにして、RustのResult型を擬似的に再現しています
 *
 * @type {T} 引数のfuncが返す値の型
 * @param {(...args: any[]) => T} func - エラーが発生しうる関数
 * @return {ResultMap<T>} - 'data'と'error'をkeyに持つMapオブジェクト
 */
export const createResultMap = <T>(func: (...args: any[]) => T) => {
  const resultMap: ResultMap<T> = new Map()

  try {
    resultMap.set('data', func())
  } catch (error) {
    resultMap.set(
      'error',
      error instanceof Error ? error : new Error('不明なエラーが発生しました')
    )
  } finally {
    return resultMap
  }
}
