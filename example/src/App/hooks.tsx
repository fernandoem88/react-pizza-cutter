import { useEffect, useRef } from 'react'

export const useRerenderCountLogger = (name: string, value: any) => {
  const countRef = useRef(0)
  useEffect(() => {
    if (countRef.current === 0) {
      console.log(name + ': just mounted!!!')
    } else {
      console.log(name + ': rerender count=', countRef.current)
    }

    countRef.current++
  }, [value, name])
}
