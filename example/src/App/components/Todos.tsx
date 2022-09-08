import React from 'react'
import { useRerenderCountLogger } from '../hooks'

export const Todos: React.FC<{ todos: string[] }> = ({ todos }) => {
  useRerenderCountLogger('todos', todos)
  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>{todo}</li>
      ))}
    </ul>
  )
}
