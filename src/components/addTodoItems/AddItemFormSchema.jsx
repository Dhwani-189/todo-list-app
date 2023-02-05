import * as Yup from 'yup'

export const AddTodoItemFormSchema = Yup.object({
  todoItem: Yup.string()
    .trim()
    .required('Task Name is a required field')
    .max(59, 'Task Name must be at most 60 characters'),
}).required()
