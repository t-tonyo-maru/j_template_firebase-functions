export default () => ({
  // GCP Secret Manager に登録したシークレットキー
  secrets: ['FB_PROJECT_ID', 'FB_PRIVATE_KEY', 'FB_CLIENT_EMAIL', 'FB_REGION'],
  // Firebase プロジェクト情報
  firebaseCredentials: {
    projectId: `${process.env.FB_PROJECT_ID}`,
    clientEmail: `${process.env.FB_CLIENT_EMAIL}`,
    privateKey: `${process.env.FB_PRIVATE_KEY}`.replace(/\\n/g, '\n')
  },
  // Functions のリージョン
  region: `${process.env.FB_REGION}`,
  // Firestore Cloud Firestore のコレクション名
  firestoreCollectionNames: {
    todos: 'todos'
  },
  // アップロードファイルの上限サイズ 2MB
  maxByteSizeUploadFile: 2 * 1000 * 1000,
  // バージョン
  version: 'v1.0.0'
})
