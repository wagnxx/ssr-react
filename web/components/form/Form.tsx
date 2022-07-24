import React, {
  ReactNode,
  useMemo,
  createRef,
  MouseEvent,
  InvalidEvent,
  SyntheticEvent
} from 'react'
import classNames from 'classnames'
import { FormContext, typeMode, iFormContext } from './context'
import { useOnOutsideClick } from '@/hooks/useOutsideClick'
import { FormControl } from '../rc-field-form'

interface iFormProps {
  children?: ReactNode
  colon?: boolean
  mode?: typeMode.vertical | typeMode.horizontal
  className?: string
  name?: string
  maskClick?: (e: Event) => void
}

interface iEvents {
  onClick: (event: MouseEvent<HTMLDivElement, MouseEvent>) => void
}

/**
 * Form comp 主要用来收集和管理FormItem 的field ，submit 给用户
 *
 * Form 的属性有：
 *  layout 水平/垂直 方向
 *  gap： FormItem直接的间隙
 *  render： data/children
 *
 */
const FormInternal = (props: iFormProps, ref: any) => {
  const {
    children,
    mode = typeMode.vertical,
    colon = true,
    className = '',
    name = '__FORM_ROOT__',
    maskClick = (e: Event) => {}
  } = props

  // const [wrapForm] = useForm(form);
  const {
    __INTERNAL__
  }: {
    __INTERNAL__: {
      name: string | undefined
      itemRef: any
    }
  } = {
    __INTERNAL__: {
      name: 'internal',
      itemRef: () => ({} as any)
    }
  }
  __INTERNAL__.name = name

  const formContextValue = useMemo<iFormContext>(
    () => ({
      mode,
      colon,
      name,
      className,
      itemRef: __INTERNAL__.itemRef
    }),
    [mode, colon]
  )

  const prefixCls = 'form'
  const formClassName = classNames(
    'c-form',
    {
      [`${prefixCls}-layout-virtical`]: mode === typeMode.vertical,
      [`${prefixCls}-layout-horizontal`]: mode === typeMode.horizontal
    },
    className
  )

  const { innerBorderRef } = useOnOutsideClick(maskClick)

  return (
    <FormContext.Provider value={formContextValue}>
      <div className="c-form-mask">
        <FormControl>
          <div className={formClassName} ref={innerBorderRef}>
            {children}
          </div>
        </FormControl>
      </div>
    </FormContext.Provider>
  )
}

const Form = React.forwardRef(FormInternal)

export default Form
