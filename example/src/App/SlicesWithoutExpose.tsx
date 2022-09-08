import React, { useCallback, useState } from 'react'
import { AddTodo } from './components/AddTodo'
import { Title } from './components/Title'
import { Todos } from './components/Todos'
import { useRerenderCountLogger } from './hooks'

const TitleContainer: React.FC<{ title: any; setTitle: any }> = React.memo(
  ({ title, setTitle }) => {
    return <Title title={title} setTitle={setTitle} />
  }
)

const TodosContainer: React.FC<{ todos: any; addTodo: any }> = React.memo(
  ({ todos, addTodo }) => {
    return (
      <div>
        <Todos todos={todos} />
        <AddTodoContainer addTodo={addTodo} />
      </div>
    )
  }
)

const AddTodoContainer: React.FC<{ addTodo: any }> = React.memo(
  ({ addTodo }) => {
    return <AddTodo addTodo={addTodo} />
  }
)

const style = { width: 500, margin: 'auto' } as any

const ContainerInBetween: React.FC<{
  todos: any
  addTodo: any
  title: any
  setTitle: any
}> = React.memo(({ todos, addTodo, setTitle, title }) => {
  useRerenderCountLogger('ContainerInBetween', {})
  return (
    <div style={style}>
      <TitleContainer title={title} setTitle={setTitle} />
      <TodosContainer todos={todos} addTodo={addTodo} />
    </div>
  )
})

const SliceApp: React.FC = () => {
  const [todos, setTodos] = useState<string[]>([])
  const [title, setTitle] = useState('title')

  const addTodo = useCallback((todo: string) => {
    setTodos((todos) => [...todos, todo])
  }, [])

  useRerenderCountLogger('app root', {})

  return (
    <ContainerInBetween
      todos={todos}
      addTodo={addTodo}
      title={title}
      setTitle={setTitle}
    />
  )
}

export default SliceApp
