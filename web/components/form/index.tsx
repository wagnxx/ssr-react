import InternalForm from './Form'
import FormItem from './formItem'
import { ReactNode } from 'react'

type InternalFormType = typeof InternalForm
interface FormInterface extends InternalFormType {
  Item: ReactNode
}

const Form = InternalForm as FormInterface

Form.Item = FormItem

export { FormItem }
export default Form
