export type TodoDAO = {
  userId: number | string
  title: string
}

export type TodoDTO = {
  userId: number | string
  id: number
  title: string
  completed: boolean
}
