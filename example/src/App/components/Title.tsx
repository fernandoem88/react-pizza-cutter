import React, { useEffect } from 'react'
import { useRerenderCountLogger } from '../hooks'

export const Title: React.FC<{
  title: string
  setTitle: (title: string) => void
}> = ({ title, setTitle }) => {
  //
  useRerenderCountLogger('title', title)
  useRerenderCountLogger('setTitle', setTitle)

  // this useEffect upddate thte title every 2 seconds
  useEffect(() => {
    let i = 1

    const ti = setInterval(() => {
      setTitle('title: ' + i)
      i++
    }, 2000)

    const to = setTimeout(() => {
      ti && clearInterval(ti)
    }, 20000)

    return () => {
      ti && clearInterval(ti)
      clearTimeout(to)
    }
  }, [setTitle])

  return <h1>{title}</h1>
}
