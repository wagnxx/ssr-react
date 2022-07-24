/* eslint-disable no-debugger */
import React, { Component } from 'react'
import FieldContext from './FieldContext'

export class Field extends Component<any, any, any> {
  static contextType = FieldContext

  componentDidMount() {
    this.context.registerField(this)
  }

  onStoreChange = () => {
    this.forceUpdate()
  }

  getControlled = (childProps: any) => {
    const { name, defaultValue } = this.props
    // console.log('this.context =====>>::', this.context)
    const { getFieldValue, setFieldValue } = this.context
    // 过滤掉  部分属性
    //  Invalid value for prop `$$typeof` on <input> tag.
    const { $$typeof, ...validChildProps } = childProps

    let value = getFieldValue(name)
    if (value === undefined) {
      value = defaultValue || ''
      setFieldValue(name, value)
    }
    return {
      ...validChildProps,
      value,
      onChange: (e: any) => {
        setFieldValue(name, e.target.value)
      }
    }
  }

  render() {
    // console.log('渲染 Field')
    const children = this.props.children as any
    // console.log('渲染 Field children:', children)

    // 给children添加属性
    return React.cloneElement(children, this.getControlled(children))
  }
}
export default Field
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// TODO
// how set context in class component

/**
 *
 * Function Component todo
 *
 *
 *

 function WrapperField<Values = any>({ name }: FieldProps<Values>) {
   // function WrapperField<Values = any>({ name }: FieldProps<Values>) {
   const fieldContext = React.useContext(FieldContext)

   // const namePath = name !== undefined ? getNamePath(name) : undefined;

   return <Field fieldContext={fieldContext} name={name} />
 }

 // export default WrapperField

 export interface InternalFieldProps<Values = any> {
   children?: React.ReactElement
 }

 export interface FieldProps<Values = any> extends InternalFieldProps {
   name?: string
   // children?: React.ReactElement
 }

 */
