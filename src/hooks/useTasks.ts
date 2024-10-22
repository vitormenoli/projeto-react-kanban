import { useContext } from "react"
import { TasksContext } from "../contexts/TasksContext"

export const useTasks = () => {
  return useContext(TasksContext)
}