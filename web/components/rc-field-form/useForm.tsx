/* eslint-disable @typescript-eslint/no-throw-literal */
import React, { useRef, useState } from 'react'
import { FormInstance } from './FieldContext'

class FormStore {
  forceRerender: any
  store: any
  callbacks: any
  fieldEntities: any

  constructor(forceRerender?: any) {
    this.forceRerender = forceRerender
    this.store = {}
    this.callbacks = {}
    this.fieldEntities = []
  }

  registerField = (fieldEntity: any) => {
    this.fieldEntities.push(fieldEntity)
  }

  setFieldValue = (key: any, val: any) => {
    this.store[key] = val
    this.fieldEntities.forEach((entity: any) => {
      if (entity.props.name && entity.props.name === key) {
        entity.onStoreChange()
      }
    })
  }

  setFieldsValue = (value: any) => {
    this.store = {
      ...this.store,
      ...value
    }
    this.fieldEntities.forEach((entity: any) => entity.onStoreChange())
  }

  getFieldValue = (name: any) => this.store[name]

  getFieldsValue = () => ({ ...this.store })

  setCallbacks = (callbacks: () => void) => {
    this.callbacks = callbacks
  }

  setInitialValues = (initialValues: any) => {
    this.store = { ...initialValues }
  }

  submit = async () => {
    const { onFinish, onFinishFailed } = this.callbacks
    this.validateFields()
      .then((values) => {
        if (onFinish) {
          try {
            onFinish({ ...values })
          } catch (error) {
            console.error(error)
          }
        }
      })
      .catch((error) => {
        if (onFinishFailed) {
          onFinishFailed(error)
        }
      })
    // try {
    //   const values = await this.validateFields()
    //   if (this.callbacks?.onFinish) {
    //     // this.callbacks.onFinish ?? this.callbacks.onFinish({ ...values })
    //     this.callbacks.onFinish({ ...values })
    //   }
    // } catch (error) {
    //   this.callbacks.onFinishFailed ??
    //     this.callbacks.onFinishFailed(error.errors)
    // }
  }

  validateFields = () => {
    const values = this.getFieldsValue()
    // console.log('prepareto validate: value:', values)
    // validate
    const entryValues = Object.values(values)
    const hasEmptyValue = entryValues.some(
      (item) => item === '' || item === undefined
    )

    if (hasEmptyValue) {
      const error = new Error('不能有空值')
      return Promise.reject(error)
    }
    return Promise.resolve(values)
  }

  getForm = () => {
    return {
      setFieldsValue: this.setFieldsValue,
      setFieldValue: this.setFieldValue,
      getFieldValue: this.getFieldValue,
      getFieldsValue: this.getFieldsValue,
      setCallbacks: this.setCallbacks,
      setInitialValues: this.setInitialValues,
      submit: this.submit,
      registerField: this.registerField
    }
  }
}

// export default function useForm(form: FormInstance) {
//   const formRef = useRef<any>({})
//   const [, setUpstate] = useState({})

//   if (!formRef.current) {
//     if (form) {
//       formRef.current = form
//     } else {
//       const forceReRender = () => {
//         setUpstate({})
//       }
//       const formStore = new FormStore(forceReRender)
//       const formInstance = formStore.getForm()
//       formRef.current = formInstance
//     }
//   }

//   return [formRef.current]
// }

// function useForm<Values = any>(
//   form?: FormInstance<Values>
// ): [FormInstance<Values>] {
//   const formRef = React.useRef<FormInstance>(null)
//   const [, forceUpdate] = React.useState({})

//   if (!formRef.current) {
//     if (form) {
//       formRef.current = form
//     } else {
//       // Create a new FormStore if not provided
//       const forceReRender = () => {
//         forceUpdate({})
//       }

//       const formStore: FormStore = new FormStore(forceReRender)

//       formRef.current = formStore.getForm()
//     }
//   }

//   return [formRef.current]
// }

function useForm<Values = any>(
  form?: FormInstance<Values>
): [FormInstance<Values> | undefined] {
  const formRef = React.useRef<FormInstance | any>()
  const [, forceUpdate] = React.useState({})

  if (!formRef.current) {
    if (form) {
      formRef.current = form
    } else {
      // Create a new FormStore if not provided
      const forceReRender = () => {
        forceUpdate({})
      }

      const formStore: FormStore = new FormStore(forceReRender)

      formRef.current = formStore.getForm()
    }
  }

  return [formRef.current]
}

export default useForm
