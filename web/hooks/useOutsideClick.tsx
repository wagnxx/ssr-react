import { useEffect, useRef } from 'react'

export const useOnOutsideClick = (handleOutsideClick: () => void) => {
  const innerBorderRef = useRef<HTMLElement | null>()

  const onClick = (event: any) => {
    if (
      innerBorderRef.current &&
      !innerBorderRef.current.contains(event.target)
    ) {
      handleOutsideClick()
    }
  }

  useMountEffect(() => {
    document.addEventListener('click', onClick, true)
    return () => {
      document.removeEventListener('click', onClick, true)
    }
  })

  return { innerBorderRef }
}

const useMountEffect = (fun: () => () => void) => useEffect(fun, [])
