// lib
import dotenv from 'dotenv'

// 環境変数の読み込み設定
dotenv.config()

export const settings = {
  // GCP Secret Manager に登録したシークレットキー
  secrets: [
    'FB_PROJECT_ID',
    'FB_PRIVATE_KEY',
    'FB_CLIENT_EMAIL',
    'JWT_SECRET_KEY',
    'FB_REGION'
  ],
  // Firebase プロジェクト情報
  firebaseCredentials: {
    projectId: `${process.env.FB_PROJECT_ID}`,
    clientEmail: `${process.env.FB_CLIENT_EMAIL}`,
    privateKey: `${process.env.FB_PRIVATE_KEY}`.replace(/\\n/g, '\n')
  },
  // JWT シークレットキー
  jwtSecretKey: `${process.env.JWT_SECRET_KEY}`,
  // Functions のリージョン
  region: `${process.env.FB_REGION}`,
  // Firestore Cloud Firestore のコレクション名
  firestoreCollectionNames: {
    todos: 'todos'
  }
}
