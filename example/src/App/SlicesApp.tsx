import React, { useCallback, useState } from 'react'
import { createPizzaCutter } from 'react-pizza-cutter'

import { AddTodo } from './components/AddTodo'
import { Title } from './components/Title'
import { Todos } from './components/Todos'
import { useRerenderCountLogger } from './hooks'

const style = { width: 500, margin: 'auto' } as any

export const { PizzaCutter, useSlice } = createPizzaCutter([
  'todos',
  'addTodo',
  'title',
  'setTitle'
] as const)

const TitleContainer = React.memo(() => {
  const title = useSlice('title')
  const setTitle = useSlice('setTitle')
  return <Title title={title} setTitle={setTitle} />
})

const TodosContainer = React.memo(() => {
  const todos = useSlice('todos') as string[]
  return (
    <div>
      <Todos todos={todos} />
      <AddTodoContainer />
    </div>
  )
})

const AddTodoContainer = React.memo(() => {
  const addTodo = useSlice('addTodo')
  return <AddTodo addTodo={addTodo} />
})

const ContainerInBetween = React.memo(() => {
  useRerenderCountLogger('ContainerInBetween', {})
  return (
    <div style={style}>
      <TitleContainer />
      <TodosContainer />
    </div>
  )
})

const SlicesApp: React.FC = () => {
  useRerenderCountLogger('app root', {})

  const [todos, setTodos] = useState<string[]>([])
  const [title, setTitle] = useState('title')

  const addTodo = useCallback((todo: string) => {
    setTodos((todos) => [...todos, todo])
  }, [])

  return (
    <PizzaCutter slices={{ todos, addTodo, title, setTitle }}>
      <ContainerInBetween />
    </PizzaCutter>
  )
}

export default SlicesApp
