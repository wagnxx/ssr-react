import React, { useRef } from 'react'
import useForm from './useForm'
import FieldContext from './FieldContext'

const FormControl = ({
  initialValues,
  callbacks,
  children,
  ...restProps
}: any) => {
  const moutedRef = useRef<any>(null)
  const [formInstance] = useForm(moutedRef.current)

  if (!moutedRef.current) {
    initialValues && formInstance?.setInitialValues(initialValues)
    callbacks && formInstance?.setCallbacks(callbacks)
    moutedRef.current = true
  }
  console.log('forminstance', formInstance)
  // form observe submit event
  return (
    <form
      onSubmit={(event) => {
        event.stopPropagation()
        event.preventDefault()
        // 调用表单提交方法
        formInstance?.submit()
      }}
      {...restProps}
    >
      <FieldContext.Provider value={formInstance}>
        {children}
      </FieldContext.Provider>
    </form>
  )
}

export default FormControl
