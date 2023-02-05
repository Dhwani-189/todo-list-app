import React, { useEffect, useState } from 'react'
import { Checkbox, message, Table } from 'antd'
import { CrossIcon } from '../../svgIcons/CrossIcon'
import { PREDEFINE_TASK } from '../../constant'
import { SuccessIcon } from '../../svgIcons/SuccessIcon'

const TodoListComponent = (props) => {
  const { todoItem, setTodoItem } = props
  console.log('todoItem: ', todoItem)

  const [activeFilter, setActiveFilter] = useState('All')

  const handleFilter = (type) => {
    const newTodos = [...todoItem]
    let filtered = newTodos.filter((task) => {
      if (type === 'Not_Completed') {
        return !task.complete
      } else if (type === 'Completed') {
        return task.complete
      } else if (type === 'All') {
        return task
      }
    })
    setTodoItem(filtered)
  }

  const handleRemoveItemFromList = async (item) => {
    const newTodos = [...todoItem]
    const index = todoItem?.findIndex((i) => i?.id === item?.id)
    newTodos.splice(index, 1)
    setTodoItem(newTodos)
    message.success(`${item?.task} deleted successfully`)
  }
  const handleCompletionOfTask = async (item) => {
    const index = todoItem?.findIndex((i) => i?.id === item?.id)
    const newTodos = [...todoItem]
    newTodos[index].complete = !newTodos[index].complete
    setTodoItem(newTodos)
  }

  const getActions = (todoItem) => {
    if (todoItem) {
      return (
        <div className="flex items-center justify-end cursor-pointer">
          <CrossIcon
            className="ml-3 w-3 h-3 cursor-pointer"
            onClick={() => handleRemoveItemFromList(todoItem)}
          />
        </div>
      )
    }
  }
  const todoColumns = [
    {
      title: 'Task List',
      dataIndex: 'task',
      sorter: false,
      render: (task, todoList) => (
        <span
          className={`${
            todoList.complete ? 'line-through' : ''
          } capitalize text-base cursor-pointer flex`}
          onClick={() => handleCompletionOfTask(todoList)}
        >
          {todoList?.complete && (
            <SuccessIcon className=" mr-2 text-grey-600" />
          )}
          {task ?? 'N/A'}
        </span>
      ),
    },
    {
      render: (todoList) => getActions(todoList),
    },
  ]

  useEffect(() => {
    handleFilter(activeFilter)
    return () => {
      setActiveFilter('All')
    }
  }, [activeFilter])

  return (
    <>
      <Checkbox
        onChange={() => {
          setTodoItem(PREDEFINE_TASK)
        }}
      >
        All
      </Checkbox>
      <Checkbox
        onChange={() => {
          setTodoItem(PREDEFINE_TASK)
          setActiveFilter('Completed')
        }}
      >
        Completed
      </Checkbox>
      <Checkbox
        onChange={() => {
          setTodoItem(PREDEFINE_TASK)
          setActiveFilter('Not_Completed')
        }}
      >
        Not Completed
      </Checkbox>
      <Table
        columns={todoColumns}
        dataSource={todoItem}
        pagination={false}
        loading={false}
        scroll={{ y: 400 }}
      />
    </>
  )
}

export default TodoListComponent
