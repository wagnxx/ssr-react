import React, {
  useContext,
  createContext,
  PropsWithChildren,
  ReactNode,
  Context,
  useState,
  useEffect
} from 'react'
import { STORE_CONTEXT } from '_build/create-context'
import { IContext } from 'ssr-types-react'
const DBContext: Context<any> = createContext({})

export const useDBContext = () => {
  return useContext(DBContext)
}

export default function DBProvider(props: PropsWithChildren<ReactNode>) {
  const { state, dispatch } = useContext<IContext<any>>(STORE_CONTEXT)
  const [menu, setMenu] = useState(state?.dbState?.menuList || [])
  const [activeIndex, setActiveIndex] = useState(
    state?.dbState.activeIndex || 0
  )

  const updateMenuActiveIndex = (name: string) => {
    setActiveIndex((preIndex: number) => {
      const newIndex = menu.findIndex((item: any) => name === item.name)
      if (preIndex === newIndex) return preIndex
      return newIndex
    })
  }

  useEffect(() => {
    dispatch?.({
      type: 'updateDbValue',
      payload: {
        dbState: {
          menuList: menu
        }
      }
    })
  }, [menu])

  useEffect(() => {
    setMenu((preMenuList: any[]) => {
      let newMenuList: any[] = [...preMenuList]
      newMenuList = newMenuList.map((menu, index) => {
        if (index !== activeIndex) {
          menu.active = false
        } else {
          menu.active = true
        }
        return menu
      })
      return newMenuList
    })
  }, [activeIndex])

  const value = {
    menu,
    activeMenuItem: menu[activeIndex],
    updateMenuActiveIndex
  }
  return <DBContext.Provider value={value}>{props.children}</DBContext.Provider>
}
