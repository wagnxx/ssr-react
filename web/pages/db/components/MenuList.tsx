import React, { useState } from 'react'
import { IItemTableName } from '@/../typings/data'

import DBProvider, { useDBContext } from '@/context/db'

export default function MenuList() {
  const DBContext = useDBContext()
  const menuList = DBContext.menu
  // console.log('menuList', menuList)

  const updateActiveMenu = (name: string) => {
    DBContext.updateMenuActiveIndex(name)
  }
  return (
    <ul>
      {menuList.map((item: IItemTableName) => {
        return (
          <li
            key={item.name}
            className={`menu__item ${item.active ? 'menu__item-active' : ''}`}
            onClick={() => updateActiveMenu(item.name)}
          >
            {item.name}
          </li>
        )
      })}
    </ul>
  )
}
