import React, { createContext, useContext, useState } from 'react'

export enum typeMode {
  vertical = 'vertical',
  horizontal = 'horizontal'
}

export interface iFormContext {
  colon?: boolean
  mode: typeMode.vertical | typeMode.horizontal
  // namespace: string
  // itemRef: (
  //   name: (string | number | any | (string | number)[]) => (node: React.ReactElement) => void
  itemRef: (name: Array<string | number>) => (node: React.ReactElement) => void
}

export const FormContext = createContext<iFormContext>({
  colon: true,
  mode: typeMode.vertical,
  // namespace: '__FORM_ROOT__',
  itemRef: (() => {}) as any
})

export const useFormContext = function () {
  return useContext(FormContext)
}

// function FormContextProvider({ children }: any) {
//   const [mode, setMode] = useState(typeMode.vertical)
//   const [colon, setColon] = useState(true)

//   const value = {
//     mode,
//     colon,
//     itemRef: (() => {}) as any
//     // setMode,
//     // setColon
//   }
//   return <FormContext.Provider value={value}>{children}</FormContext.Provider>
// }

// export default FormContextProvider
