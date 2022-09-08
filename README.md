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
const PizzaMix: React.FC = () => {
  const [pizza, setPizza] = useState({
    diavolo: 100,
    quattroFormaggi: 100,
    olive: 100,
    funghi: 100,
    anas: 100
  })

  const { ananas, ...pizzaSlices } = pizza
  // because of the object destructuring, pizzaSlices will always have a new object reference
  // that means, using a normal react context, it should create a performance issue by rerendering all the time.
  // but not using react-pizza-cutter. because only slice values/references matter

  const handleBite = () => {
    const slice = getRandomSliceName(pizza)
    const oldSliceWeight = pizza[slice]
    if (oldSliceWeight <= 0) return
    setPizza((state) => {
      return { ...state, [slice]: oldSliceWeight - 10 }
    })
  }

  console.log('PizzaMix rerender')
  return (
    <PizzaCutter slices={pizzaSlices}>
      <PizzaDough />
      <button onClick={handleBite}>bite a slice</button>
    </PizzaCutter>
  )
}

// PizzaDough.tsx
// since the PizzaDough component is a direct child of the PizzaMix component,
// and the PizzaMix component is updated frequently, we want to use React.memo to filter out unwanted rerenders
const PizzaDough = React.memo(() => {
  // some mozzarella state over here
  // some pomodoro hooks over here
  // but no prop drilling
  console.log('PizzaDough rerender')
  return (
    <div>
      <h1>pomodo and mozzarella only</h1>
      <DiavoloSlice />
      <OliveSlice />
      <QuattroFormaggiSlice />
      <FunghiSlice />
    </div>
  ))
}

// now we can consume our slice values in the Slice components
const DiavoloSlice = () => {
  console.log('DiavoloSlice rerender')
  const diavolo = useSlice('diavolo')
  // some hooks with Salame and hot pepper here
  return <div>{diavolo}</div>
}

const OliveSlice = () => {
  console.log('OliveSlice rerender')
  const diavolo = useSlice('olive')
  // some other hooks with olive and salvia leaves
  return <div>{diavolo}</div>
}
```

as you can see in the above example, containers states are independent. the change in one component does not affect another component

# PizzaCutter

the PizzaCutter component can be used to provide anything from one parent down to the components tree.

```tsx
const Provider = (props) => {
  const [store, dispatch] = useReducer(initialState, reducers)
  const [randomState, setRandomState] = useState(getRandomValue)
  return (
    <PizzaCutter slices={{ store, dispatch, randomState }}>
      {props.children}
    </PizzaCutter>
  )
}

const ActionBtn = () => {
  const dispatch = useSlice('dispatch')
  return <button onClick={() => dispatch('click-action')}>click</button>
}
```

# License

MIT © [https://github.com/fernandoem88/react-pizza-cutter](https://github.com/fernandoem88/react-pizza-cutter)
