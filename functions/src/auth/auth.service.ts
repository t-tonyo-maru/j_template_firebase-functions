// lib
import { Injectable, UnauthorizedException } from '@nestjs/common'
// service
import { FirebaseService } from '@/firebase/firebase.service'

@Injectable()
export class AuthService {
  constructor(private readonly firebaseService: FirebaseService) {}

  /**
   * クライアント側のfirebase/authで生成したidTokenを元に、ユーザーがログイン中かを判定する
   *
   * @param {string} idToken - クライアント側のfirebase/authで生成したidToken
   * @return {Promise<boolean>}
   */
  async verifyToken(idToken: string) {
    let result = false
    await this.firebaseService
      .getAuth()
      .verifyIdToken(idToken, true) // 期限切れtokenは認証不可とする
      .then(() => {
        result = true
      })
      .catch(() => {
        throw new UnauthorizedException()
      })

    return result
  }

  /**
   * ログイン中ユーザーのidTokenをリフレッシュする
   *
   * @param {string} uid - ログインユーザーのuid
   * @return {Promise<{message: string}>}
   */
  async revokeTokens(uid: string) {
    await this.firebaseService
      .getAuth()
      .revokeRefreshTokens(uid)
      .catch(() => {
        throw new UnauthorizedException()
      })
    return {
      message: 'SUCCESS'
    }
  }
}
