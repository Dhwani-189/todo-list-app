import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { deepClone, PREDEFINE_TASK } from '../../constant'
import { InputField } from '../formFieldComponent'
import TodoListComponent from '../TodoList/todoListComponent'
import { AddTodoItemFormSchema } from './AddItemFormSchema'
import { yupResolver } from '@hookform/resolvers/yup'

const AddTodoItemComponent = () => {
  const [initialTasks, setInitialTasks] = useState(PREDEFINE_TASK)
  const { register, formState, handleSubmit, reset } = useForm({
    resolver: yupResolver(AddTodoItemFormSchema),
  })
  console.log(formState?.errors, 'll')
  const onSubmit = async (values) => {
    setInitialTasks((d) => {
      const temp = deepClone(d)
      temp.splice(0, 0, {
        id: initialTasks?.length + 1,
        task: values?.todoItem,
        complete: false,
      })
      return temp
    })
    reset({
      todoItem: null,
    })
  }

  useEffect(() => {
    return () => {
      setInitialTasks(PREDEFINE_TASK)
    }
  }, [])

  return (
    <>
      <form id="addTodoList" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-46 h-36 pl-[20px] ml-48 mr-48 mt-16 bg-red ">
          <div className="text-white text-xl pt-7">My To Do List</div>
          <div className="flex justify-center mt-5">
            <InputField
              {...{
                id: 'todoItem', 
                register,
                placeholder: 'Title...',
                formState,
                className: 'w-[100%]',
              }}
            />
            <Button
              type="primary"
              htmlType="submit"
              form="addTodoList"
              className="!btn-primary bg-grey-600  justify-center min-w-[112px] !h-[28px]"
            >
              Add
            </Button>
          </div>

          <div className="mt-[60px]">
            <TodoListComponent
              todoItem={initialTasks}
              setTodoItem={setInitialTasks}
            />
          </div>
        </div>
      </form>
    </>
  )
}

export default AddTodoItemComponent
