import React, { useState } from 'react'
/**
 *
 * @param initialVal {Boolean}
 */
type propsTypes = boolean | undefined

export default function useToggle(initialVal: propsTypes): [boolean, Function] {
  const [state, setState] = useState(!!initialVal)
  const toggle = (val: propsTypes) => {
    setState((preVal) => {
      return typeof val === 'boolean' ? val : !preVal
    })
  }
  return [state, toggle]
}
