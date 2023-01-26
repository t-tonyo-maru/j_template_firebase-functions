// module
// ブラウザ/Node.jsの双方でfetchを扱うためのポリフィル。jestのテストに利用する
import fetch from 'cross-fetch'

/**
 * 実行するとfetch()の結果（Promiseオブジェクト）を返却する関数を生成する<br/>
 * () => fetch(url, data)を返却しているのは、fetchを任意のタイミングで実行・解決させるため<br/>
 * fetch: https://developer.mozilla.org/ja/docs/Web/API/Fetch_API/Using_Fetch
 *
 * @param firstArgs - fetch生成関数用のオプション。高階関数のうちのはじめの関数の引数
 * @param {RequestInfo | URL} firstArgs.baseUrl - fetchの対象となるURLのベース
 * @param secondArgs - fetch生成関数用のオプション。高階関数のうちの後ろの関数の引数
 * @param {RequestInfo | URL} secondArgs.url - ベースURL以降のパス
 * @param {RequestInit | undefined } secondArgs.option - fetchのオプション
 * @return {(() => Promise<Response>)} 実行するとfetch()の結果（Promiseオブジェクト）を返却する関数
 */
export const createFetch = ({ baseUrl }: { baseUrl: string }) => {
  return ({
    path = '',
    option
  }: {
    path: RequestInfo | URL
    option?: RequestInit
  }) => fetch(`${baseUrl}${path}`, typeof option === 'undefined' ? {} : option)
}

/**
 * createFetchにtimeout機能を追加した関数<br/>
 * fetch APIにはデフォルトでtimeout機能がないために、AbortController APIを利用してtimeoutを再現する
 * AbortController: https://developer.mozilla.org/ja/docs/Web/API/AbortController
 *
 * @param firstArgs - fetch生成関数用のオプション。高階関数のうちのはじめの関数の引数
 * @param {RequestInfo | URL} firstArgs.baseUrl - fetchの対象となるURLのベース
 * @param secondArgs - fetch生成関数用のオプション。高階関数のうちの後ろの関数の引数
 * @param {RequestInfo | URL} secondArgs.url - ベースURL以降のパス
 * @param {RequestInit | undefined } secondArgs.option - fetchのオプション
 * @param {number} secondArgs.timeout - fetchのtimeout時間（ミリ秒）
 * @return {(() => Promise<Response>)} 実行するとfetch()の結果（Promiseオブジェクト）を返却する関数
 */
export const createFetchWithTimeout = ({ baseUrl }: { baseUrl: string }) => {
  return ({
    path = '',
    option,
    timeout = 1000 * 60
  }: {
    path: RequestInfo | URL
    option?: RequestInit
    timeout: number
  }) => {
    const controller = new AbortController()
    const timer = setTimeout(() => {
      controller.abort()
    }, timeout)

    const fetchOption =
      typeof option === 'undefined'
        ? { signal: controller.signal }
        : { ...option, signal: controller.signal }

    return fetch(`${baseUrl}${path}`, fetchOption).finally(() => {
      clearTimeout(timer)
    })
  }
}
