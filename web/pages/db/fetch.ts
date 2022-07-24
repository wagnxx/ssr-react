import { ReactMidwayFetch } from 'ssr-types-react'
import { IDBTableName } from '~/typings/data'

const fetch: ReactMidwayFetch<{
  dbService: {
    getDBTableList: () => Promise<IDBTableName>
  }
}> = async ({ ctx, routerProps }) => {
  if (!__isBrowser__) {
    const data = await ctx!.dbService?.getDBTableList()
    const menuList = data?.data || []
    // menuList[0] && (menuList[0].active = true)

    console.log('menuList in fetch.ts::', menuList)

    return {
      // 建议根据模块给数据加上 namespace防止数据覆盖
      // data: data?.data || [],
      dbState: {
        menuList: menuList,
        activeIndex: 0
      }
    }
  }
}

export default fetch
