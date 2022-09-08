import React, { useContext, createContext, useRef } from 'react'

const ChildrenMemo = React.memo(({ children }) => (
  <React.Fragment>{children}</React.Fragment>
))

export const createPizzaCutter = <S extends Record<string, any>>(
  slices: readonly [...(keyof S)[]]
) => {
  type Tkeys = keyof S
  const ctx = createContext<S>({} as any)

  const uniqSliceNames = Array.from(new Set(slices))

  const contexts = { __global__: ctx } as any

  const createSliceProvider = (sliceIndex: number): React.FC => {
    const sliceName = uniqSliceNames[sliceIndex]
    const sliceCtx = createContext<any>(undefined)

    contexts[sliceName] = sliceCtx

    const SliceProvider: React.FC = (props) => {
      const globalState = useContext(ctx)
      const sliceState = globalState[sliceName]

      return (
        <sliceCtx.Provider value={sliceState}>
          {props.children}
        </sliceCtx.Provider>
      )
    }
    SliceProvider.displayName = 'SliceProvider_' + sliceIndex

    const nextSliceIndex = sliceIndex + 1
    if (nextSliceIndex < uniqSliceNames.length) {
      const SliceProviderWrapper = createSliceProvider(nextSliceIndex)
      return function ContextSlice(props: any) {
        return (
          <SliceProviderWrapper>
            <SliceProvider>{props.children}</SliceProvider>
          </SliceProviderWrapper>
        )
      }
    }

    return (props) => (
      <SliceProvider>
        <ChildrenMemo>{props.children}</ChildrenMemo>
      </SliceProvider>
    )
  }

  const SlicesRoot = createSliceProvider(0)

  const PizzaCutter: React.FC<{ slices: S }> = ({ slices, children }) => {
    return (
      <ctx.Provider value={slices}>
        <SlicesRoot>{children}</SlicesRoot>
      </ctx.Provider>
    )
  }

  const useSlice = <K extends Tkeys>(sliceName?: K) => {
    if (sliceName && !contexts[sliceName]) {
      throw new Error(
        'cannot find pizza slice context with name: "' +
          (sliceName as string) +
          '"'
      )
    }
    const sliceNameRef = useRef(sliceName || '__global__')
    const sliceState = useContext<K extends Tkeys ? S[K] : S>(
      contexts[sliceNameRef.current]
    )
    return sliceState
  }

  return { PizzaCutter, useSlice }
}
