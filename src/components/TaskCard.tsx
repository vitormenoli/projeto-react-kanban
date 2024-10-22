import { Badge, Button, Card, Flex, Heading, Text } from "@radix-ui/themes"
import { Task, TaskPriority, TaskStatus } from "../entities/Task"
import { useTasks } from "../hooks/useTasks"

interface TaskCardProps {
  task: Task
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { deleteTask, updateTask } = useTasks()

  const getActionText = (status: TaskStatus) => {
    const actionsTexts = {
      "todo": "Iniciar",
      "doing": "Concluir",
      "done": "Arquivar"
    }
    return actionsTexts[status]
  }

  const getActionColor = (status: TaskStatus) => {
    const actionColors: { [key: string]: "indigo" | "green" | "bronze" } = {
      "todo": "indigo",
      "doing": "green",
      "done": "bronze"
    }
    return actionColors[status]
  }

  const getPriorityColor = (priority: TaskPriority) => {
    const priorityColors: { [key: string]: "sky" | "amber" | "tomato" } = {
      "low": "sky",
      "medium": "amber",
      "high": "tomato",
    }
    return priorityColors[priority]
  }

  const handleDelete = (id: string) => {
    const confirmation = confirm("Tem certeza que deseja excluir essa tarefa?")
    if (confirmation) {
      deleteTask(id)
    }
  }

  const handleUpdate = () => {
    if (task.status === "todo") {
      updateTask(task.id, { status: "doing" })
    } else if (task.status === "doing") {
      updateTask(task.id, { status: "done" })
    }
  }

  return (
    <Card>
      <Flex align={"center"} gap={"4"}>
        <Heading as="h3" size={"3"}>{task.title}</Heading>
        <Badge color={getPriorityColor(task.priority)}>{task.priority}</Badge>
      </Flex>

      <Text as="p" my={"4"}>{task.description}</Text>

      <Flex gap={"2"}>
        {task.status !== "done" && (
          <Button color={getActionColor(task.status)} onClick={handleUpdate}>
            {getActionText(task.status)}
          </Button>
        )}
        <Button color="red" onClick={() => handleDelete(task.id)}>Excluir</Button>
      </Flex>
    </Card>
  )
}