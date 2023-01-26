import { ErrorRequestHandler } from 'express'

/**
 * express上で生じるエラーのall-catch関数
 *
 * @param args - ErrorRequestHandler型の引数
 * @param {any} err - エラーステータス。
 * @param {Request} _req - express.Request。利用しません。
 * @param {Response} res - express.Response
 * @param {NextFunction} _next - next関数。※app.useの最後に設定するため、nextは利用しないこと。
 * @return {void}
 */
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  res.status(err.status || 500)
  res.render('error', { error: err })
}
