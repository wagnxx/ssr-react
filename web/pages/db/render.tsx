import React, { useContext } from 'react'
import { SProps, IContext } from 'ssr-types-react'
import { IDBTableName } from '~/typings/data'
import { STORE_CONTEXT } from '_build/create-context'
import './index.less'

import MenuList from './components/MenuList'

import DBContents from './components/DBContents'
import DBProvider from '@/context/db'

export default function Index(props: SProps) {
  // const { state, dispatch } = useContext<IContext<any>>(useDBContext)
  // // console.log('dispatch', dispatch)
  // const menuList = state?.dbState?.menuList || []
  // // console.log(state)

  return (
    <DBProvider>
      <div className="c-db db-layout">
        <div className="menu db-layout-sider">
          <MenuList />
        </div>
        <div className="content db-layout-content">
          <DBContents />
        </div>
      </div>
    </DBProvider>
  )
}
