import React, { useState } from 'react'
import { useRerenderCountLogger } from '../hooks'

const style = { marginLeft: 8 } as any

export const AddTodo: React.FC<{ addTodo: (todo: string) => void }> = ({
  addTodo
}) => {
  //
  const [todo, setTodo] = useState('')

  const handleOnClick = () => {
    if (!todo) return
    addTodo(todo)
    setTodo('')
  }
  useRerenderCountLogger('addTodo', addTodo)

  return (
    <div>
      <input value={todo} onChange={(e) => setTodo(e.target.value)} />
      <button onClick={handleOnClick} style={style}>
        add todo
      </button>
    </div>
  )
}
