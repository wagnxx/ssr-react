import React, { ReactNode, useRef } from 'react'
import { useFormContext } from './context'
import { useItemRef } from '@/hooks/useItemRefs'
import Field from '../rc-field-form/Field'

/**
 * FormItem 主要用于布局
 *
 * 属性有
 *  label
 *  children ： from input 。。。
 */
interface IFormItemProps {
  children: ReactNode
  label?: string
  name: string
  colon?: boolean
}
const FormItem = (props: IFormItemProps) => {
  const { colon: colonOfContext, itemRef } = useFormContext()
  const { colon: propsColon, name } = props
  const colon = propsColon || colonOfContext || true

  // set ref to itemRef
  const getRef = useItemRef(name)

  const RenderLabel = () => {
    return (
      <>
        {props.label ? (
          <label className="form__label">{props.label}</label>
        ) : (
          ''
        )}
        {props.label && colon ? ':' : ''}
      </>
    )
  }

  // return (
  //   <div className="form__item">
  //     <RenderLabel />
  //     {props.children}
  //   </div>
  // )

  return (
    <Field name={name}>
      {RenderLabel()} {props.children}
    </Field>
  )
}

export default FormItem
