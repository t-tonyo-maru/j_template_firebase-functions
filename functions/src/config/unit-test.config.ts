// lib
import dotenv from 'dotenv'
import path from 'path'

// テスト用の環境変数を読み込み
const testEnv = dotenv.config({
  path: path.resolve(process.cwd(), '.env.test')
})

// 環境変数にマージ
Object.assign(process.env, {
  ...testEnv.parsed
})
