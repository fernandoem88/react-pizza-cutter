import React, { useContext, createContext, useRef } from 'react'

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
    SliceProvider.displayName = 'SliceProvider_' + (sliceName as string)

    if (sliceIndex > 0) {
      const SliceProviderWrapper = createSliceProvider(sliceIndex - 1)
      const ContextSlice: React.FC = (props: any) => {
        return (
          <SliceProvider>
            <SliceProviderWrapper>{props.children}</SliceProviderWrapper>
          </SliceProvider>
        )
      }
      ContextSlice.displayName = 'ContextSlice_' + (sliceName as string)
      return ContextSlice
    }

    return function LastSliceProviderWrapper(props) {
      return <SliceProvider>{props.children}</SliceProvider>
    }
  }

  const SlicesRoot = createSliceProvider(uniqSliceNames.length - 1)

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
