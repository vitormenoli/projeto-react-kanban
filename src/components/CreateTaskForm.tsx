import { PlusIcon } from "@radix-ui/react-icons"
import { Badge, Box, Button, Dialog, Flex, RadioGroup, Text, TextArea, TextField } from "@radix-ui/themes"
import { FormEventHandler } from "react"
import { z } from "zod"
import { useTasks } from "../hooks/useTasks"

const CreateTaskSchema = z.object({
  title: z.string(),
  description: z.string(),
  status: z.enum(["todo", "doing", "done"]),
  priority: z.enum(["low", "medium", "high"])
})

export const CreateTaskForm: React.FC = () => {
  const { createTask } = useTasks()

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (ev) => {
    ev.preventDefault()

    const formData = new FormData(ev.currentTarget)

    const title = formData.get("title")
    const description = formData.get("description")
    const status = formData.get("status")
    const priority = formData.get("priority")

    ev.currentTarget.reset()

    const taskData = CreateTaskSchema.parse({ title, description, status, priority })
    await createTask(taskData)
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>
          <PlusIcon /> Nova tarefa
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="32rem">
        <Dialog.Title>Nova Tarefa</Dialog.Title>
        <Dialog.Description size="2" mb={"4"}>
          Adicione novas tarefas ao quadro.
        </Dialog.Description>

        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="4">
            <Box maxWidth="32rem">
              <Box mb="2">
                <Text as="label" htmlFor="title">Título</Text>
              </Box>
              <TextField.Root placeholder="Defina um título" name="title" id="title" autoFocus required />
            </Box>

            <Box maxWidth="32rem">
              <Box mb="2">
                <Text as="label" htmlFor="description">Descrição</Text>
              </Box>
              <TextArea placeholder="Descreva a tarefa" name="description" id="description" required />
            </Box>

            <Flex gap={"8"}>
              <Box>
                <Text as="div" mb={"2"}>Situação</Text>
                <RadioGroup.Root name="status" defaultValue="todo">
                  <RadioGroup.Item value="todo">
                    <Badge color="gray">
                      Para Fazer
                    </Badge>
                  </RadioGroup.Item>

                  <RadioGroup.Item value="doing">
                    <Badge color="yellow">
                      Em Progresso
                    </Badge>
                  </RadioGroup.Item>

                  <RadioGroup.Item value="done">
                    <Badge color="green">
                      Concluída
                    </Badge>
                  </RadioGroup.Item>
                </RadioGroup.Root>
              </Box>

              <Box>
                <Text as="div" mb={"2"}>Prioridade</Text>
                <RadioGroup.Root name="priority" defaultValue="low">
                  <RadioGroup.Item value="low">
                    <Badge color="sky">
                      Baixa
                    </Badge>
                  </RadioGroup.Item>

                  <RadioGroup.Item value="medium">
                    <Badge color="amber">
                      Média
                    </Badge>
                  </RadioGroup.Item>

                  <RadioGroup.Item value="high">
                    <Badge color="tomato">
                      Alta
                    </Badge>
                  </RadioGroup.Item>
                </RadioGroup.Root>
              </Box>
            </Flex>

            <Flex gap="2" justify={"end"}>
              <Dialog.Close>
                <Button color="gray" variant="soft">Cancelar</Button>
              </Dialog.Close>
              <Button type="submit">Criar Tarefa</Button>
            </Flex>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  )
}