// express
import { Request, Response, NextFunction } from 'express'
// firebase
import * as functions from 'firebase-functions'
// lib
import jwt from 'jsonwebtoken'
// settings
import { admin } from '@/settings/firebase'
import { settings } from '@/settings/settings'
// types
import { JWTPayloadType } from '@/types/auth'

/**
 * JWTトークンを生成する関数です
 *
 * @param {Request} req express.Request
 * @param {Response} res express.Response
 * @return {ReturnType<createJWT>}
 */
export const createJWT = (req: Request, res: Response) => {
  const { uid, expiresIn = '1m' } = req.body as JWTPayloadType
  functions.logger.info(`Create JWT: ${uid}, ${expiresIn}`)

  if (uid) {
    const payload = { uid }
    const token = jwt.sign(payload, settings.jwtSecretKey, {
      algorithm: 'HS256',
      expiresIn
    })
    res.status(200).json({ message: 'create jwt', jwt: token })
  } else {
    res.status(400).send({ error: 'Payloadが指定されていません。' })
  }
}

/**
 * JWTトークンによる認証を行う関数
 *
 * @param {Request} req express.Request
 * @param {Response} res express.Response
 * @param {NextFunction} next express.NextFunction
 * @return {ReturnType<authenticateWithJWT>}
 */
export const authenticateWithJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tokenViaBaerer = req.headers.authorization

  if (tokenViaBaerer) {
    try {
      const token = tokenViaBaerer.split(' ')[1]
      const jwtPayload = jwt.verify(token, settings.jwtSecretKey)
      res.locals.jwtPayload = jwtPayload

      next()
    } catch (err) {
      res.status(401).send({
        error: '認証に失敗しました'
      })
    }
  } else {
    res.status(403).send({
      error: 'tokenが指定されていません'
    })
  }
}

/**
 * Firebase auth による認証を行う
 *
 * @param {Request} req express.Request
 * @param {Response} res express.Response
 * @param {NextFunction} next express.NextFunction
 * @return {ReturnType<authenticateWithFirebase>}
 */
export const authenticateWithFirebase = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const payload: JWTPayloadType = res.locals.jwtPayload

  if (payload) {
    try {
      // firebase の auth 情報を照合
      const user = await admin.auth().getUser(payload.uid)
      if (user.uid) {
        next()
      }
    } catch (err) {
      res.status(401).send({ error: '認証に失敗しました' })
    }
  } else {
    res.status(403).send({
      error: 'アクセス権限がありません'
    })
  }
}
