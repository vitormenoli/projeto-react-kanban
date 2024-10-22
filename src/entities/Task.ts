export type TaskPriority = "low" | "medium" | "high"

export type TaskStatus = "todo" | "doing" | "done"

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
}