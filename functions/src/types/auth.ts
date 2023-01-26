/**
 * @type {JWTPayloadType} ユーザー認証の型
 */
export type JWTPayloadType = {
  uid: string
  expiresIn?: string
}
