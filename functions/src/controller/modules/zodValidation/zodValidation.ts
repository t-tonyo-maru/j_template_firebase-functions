import { z } from 'zod'

/**
 * [zod](https://zod.dev/)は、TypeScript Fristのバリデーションライブラリです。<br/>
 * 基本的な使い方は、zodでスキーマ定義 → パースです。<br/>
 *
 * プリミティブ型をはじめ、オブジェクト型、配列型、関数のスキーマも定義可能です。JSONやPromiseのバリデーションもカバーされています。<br/>
 * また、TypeScript Firstのライブラリなので、定義したスキーマから型定義を生成したり、タプルやユニオン（合併型）のスキーマも定義できます。<br/>
 * 依存性もなく、非常に多機能なライブラリです。Webアプリのスキーマをzodで定義するなど、単純なバリデーション以外にも応用が効きます。
 *
 * 参考:
 * https://zod.dev/
 * https://zenn.dev/ynakamura/articles/65d58863563fbc
 */

// 文字列型のスキーマ
const sampleStringSchema = z
  .string()
  .min(4, { message: 'Must be 4 or more characters long' }) // 最小文字数
  .max(10, { message: 'Must be 10 or fewer characters long' }) // 最大文字数 4 <= x <= 10
// .regex(regex) // 正規表現

// オブジェクト型のスキーマ
const sampleObjectSchema = z.object({
  username: z.string()
})
// zodのスキーマから型推論して、型を定義できる
// @ts-ignore
type sampleObjectTypeFromZod = z.infer<typeof sampleObjectSchema>

// 配列型のスキーマ
const sampleArraySchema = z.string().array()

// Promiseのスキーマ
const samplePromiseSchema = sampleObjectSchema.promise() // Promise<{username: string}>

export {
  sampleStringSchema,
  sampleObjectSchema,
  sampleArraySchema,
  samplePromiseSchema
}
