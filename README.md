# React Pizza Cutter

[![NPM](https://img.shields.io/npm/v/react-pizza-cutter.svg)](https://www.npmjs.com/package/react-pizza-cutter)

> think of react context as a pizza with different taste for each slice. you don't wanna mix the ingredients, the taste won't probably be the expected one.
>
> - **split one context to small independent slices**: if one slace change, only the components using this slice will rerender

> - **no props drilling**: the containers between the parent and the children are not affected anymore by receiving props just to pass them down.

## Example

```tsx
import React, { useState } from 'react'
import { createPizzaCutter } from 'react-pizza-cutter'

const { PizzaCutter, useSlice } = createPizzaCutter([
  'diavolo',
  'quattroFormaggi',
  'olive',
  'funghi'
])
const PizzaGustiMisti: React.FC = () => {
  const [pizza, setPizza] = useState({
    diavolo: 100,
    quattroFormaggi: 100,
    olive: 100,
    funghi: 100,
    anas: 100
  })
  // slices will always have a new object reference
  // using a normal react context, it should create a performance issue
  // but not using react-pizza-cutter
  const { ananas, ...slices } = pizza

  const handleBite = () => {
    const slice = getRandomSliceName(pizza)
    const oldSliceWeight = pizza[slice]
    if (oldSliceWeight <= 0) return
    setPizza((state) => {
      return { ...state, [slice]: oldSliceWeight - 10 }
    })
  }

  console.log('PizzaGustiMisti rerender')
  return (
    <PizzaCutter slices={slices}>
      <PizzaWrapper />
      <button onClick={handleBite}>bite a slice</button>
    </PizzaCutter>
  )
}

// PizzaWrapper.tsx

const PizzaWrapper = () => {
  // some own logic over here
  // some hook over here
  // but no prop drilling
  console.log('PizzaWrapper rerender')
  return (
    <div>
      <h1>pizza</h1>
      <PizzaDiavolo />
      <PizzaOlive />
      <PizzaQuattroFormaggi />
      <PizzaFunghi />
    </div>
  )
}

// now we can cosume our slice values in the pizza components
const PizzaDiavolo = () => {
  console.log('PizzaDiavolo rerender')
  const diavolo = useSlice('diavolo')
  return <div>{diavolo}</div>
}

const PizzaOlive = () => {
  console.log('PizzaOlive rerender')
  const diavolo = useSlice('olive')
  return <div>{diavolo}</div>
}
```

# License

MIT © [https://github.com/fernandoem88/react-pizza-cutter](https://github.com/fernandoem88/react-pizza-cutter)
