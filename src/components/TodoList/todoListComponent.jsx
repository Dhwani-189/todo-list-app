import React, { useEffect, useState } from 'react'
import { Checkbox, message, Table } from 'antd'
import { CrossIcon } from '../../svgIcons/CrossIcon'
import { PREDEFINE_TASK } from '../../constant'

const TodoListComponent = (props) => {
  const { todoItem, setTodoItem } = props
  const [activeFilter, setActiveFilter] = useState('All')
  const handleFilter = (type) => {
    let filtered = todoItem.filter((task) => {
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
    const index = todoItem?.findIndex((i) => i?.id === item?.id)
    message.success(`${item?.task} successfully deleted `)
    // delete todoItem[index]
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
          } capitalize text-base`}
        >
          {task ?? 'N/A'}
        </span>
      ),
    },
    {
      render: (todoList) => getActions(todoList),
    },
  ]

  useEffect(() => {
    setTodoItem(PREDEFINE_TASK)
    handleFilter(activeFilter)
    return () => {
      setActiveFilter("All")
    }
  }, [activeFilter])

  return (
    <>
      <Checkbox
        onChange={() => {
          setActiveFilter('All')
        }}
      >
        All
      </Checkbox>
      <Checkbox
        onChange={() => {
          setActiveFilter('Completed')
        }}
        disabled=""
      >
        Completed
      </Checkbox>
      <Checkbox
        onChange={() => {
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
