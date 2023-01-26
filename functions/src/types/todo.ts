/**
 * @type {TodoType} Todoリスト1つ分の型
 */
export type TodoType = {
  id: string
  title: string
  description: string
  is_complete: boolean
  created_at: string
  updated_at: string
  user_id: string
}
