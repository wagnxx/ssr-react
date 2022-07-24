// 用户自定义 store，用法查看文档 http://doc.ssr-fc.com/docs/features$communication#React%20%E5%9C%BA%E6%99%AF

import { state as dbState, reducer as dbReducer } from './db.store'

const state = {
  ...dbState
}

function reducer(state: any, action: any) {
  combineReducer([dbReducer])

  function combineReducer(reducers: any) {
    const reducersFn = reducers.map((r: any) => () => r(state, action))

    for (const fn of reducersFn) {
      if (fn()) {
        return
      }
    }
  }
}

export { state, reducer }
