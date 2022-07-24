import React, { useEffect, useMemo, memo } from 'react'
import Form, { FormItem } from '@/components/form'
import { typeMode } from '@/components/form/context'
import { FormControl, FormField } from '@/components/rc-field-form'

export default function AddItemModel({ fields, values, close, onFinish }: any) {
  // allowNull: false
  // autoIncrement: true
  // field: 'id'
  // fieldName: 'id'
  // primaryKey: true
  // type: 'String'
  // const [fieldList, setFieldList] = useState([])

  useEffect(() => {}, [])

  const callbacks = useMemo(() => {
    return {
      onFinish: onFinish,
      onFinishFailed: (values: any) => {
        console.log('onFinishFailed:', values)
      }
    }
  }, [])

  return (
    <>
      {/* <div className="c-form">
        <h1>请输入以下字段</h1>
        {fields.map((field: any) => {
          return (
            <div className="form__item" key={field.fieldName}>
            <label className="form__label">{field.fieldName}:</label>
            <input
            type="text"
            data-field={field.fieldName}
            placeholder={field.type}
            disabled={field.primaryKey}
            />
            </div>
            )
          })}

          <div className="form__item">
          <button>确认</button>
          <button onClick={close}>取消</button>
          </div>
        </div> */}
      {/* <Form mode={typeMode.vertical} colon={false} maskClick={close}>
        <h1>请输入以下字段</h1>

        {fields.map((field: any) => {
          return (
            <FormItem
              label={field.fieldName}
              key={field.fieldName}
              name={field.fieldName}
            >
              <input
                type="text"
                data-field={field.fieldName}
                placeholder={field.type}
                disabled={field.primaryKey}
              />
            </FormItem>
          )
        })}
      </Form> */}
      <FormControl className="c-form" callbacks={callbacks}>
        {
          // map fields
          fields.map((field: any, index) => {
            const inputType = field.type === 'DATE' ? 'date' : 'text'
            return (
              <FormField
                className="form__item"
                key={field.fieldName}
                name={field.fieldName}
                defaultValue={values?.[field.fieldName] || ''}
              >
                <div className="form__item">
                  <label>{field.fieldName}</label>
                  <Input
                    name={field.fieldName}
                    type={inputType}
                    data-field={field.fieldName}
                    placeholder={field.type}
                    defaultValue={values?.[field.fieldName] || ''}
                    disabled={field.primaryKey}
                  />
                </div>
              </FormField>
            )
          })
        }

        <button type="submit" style={{ padding: '4px 8px' }}>
          Submit
        </button>
        <button style={{ padding: '4px 8px' }} onClick={close}>
          close
        </button>
      </FormControl>
    </>
  )
}

export const Input = memo((props: any) => {
  return <input {...props} />
})
