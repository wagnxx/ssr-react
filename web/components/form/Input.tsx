import React, { forwardRef } from 'react'

/* <input
                type="text"
                data-field={field.fieldName}
                placeholder={field.type}
                disabled={field.primaryKey}
              /> */

interface iInputProps {
  name: string
  disabled: boolean
  placeholder?: string
}
const Input = forwardRef<iInputProps, any>((props, ref) => {
  return <input {...props} ref={ref} />
})

export default Input
