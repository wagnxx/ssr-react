const namespace = 'dbState' // must only one in  app

const state = {
  [namespace]: {
    menuList: []
  }
}

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'updateDbValue':
      return {
        ...state,
        ...action.payload
        // [namespace]: {
        //   ...state[namespace],
        // }
      }
  }
}

export { namespace, state, reducer }

// [namespace, state, reducer]  reducer 只负责计算当前namespace的state
interface Store {
  namespace: string
  state: any
  reducer: Function
}

function combineStore(stores: Store[]) {
  // let state = {};
  // let dispatch = action => {
  //   const innerState =
  // }
  // 重新 定义 实现 redux， 拦截reducer返回值 并修改整个state
  // stores = stores.map(store => {
  //   return store;
  // })
}
