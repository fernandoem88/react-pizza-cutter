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

const TitleContainer = () => {
  const title = useSlice('title')
  const setTitle = useSlice('setTitle')
  return <Title title={title} setTitle={setTitle} />
}

const TodosContainer = () => {
  const todos = useSlice('todos') as string[]
  return <Todos todos={todos} />
}

const AddTodoContainer = () => {
  const addTodo = useSlice('addTodo')
  return <AddTodo addTodo={addTodo} />
}

const ContainerInBetween = React.memo(() => {
  useRerenderCountLogger('ContainerInBetween', {})
  return (
    <div style={style}>
      <TitleContainer />
      <div>
        <TodosContainer />
        <AddTodoContainer />
      </div>
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
