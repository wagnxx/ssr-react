import React, { useEffect, useState, useMemo, useReducer, ReducerState, ReducerAction, ReducerStateWithoutAction } from 'react'
import DBProvider, { useDBContext } from '@/context/db'
import AddItemModel from './AddItemModel'
import useToggle from '@/hooks/useToggle'
import { httpRequest } from '@/utils/request'
import { DateUtils } from '@/utils/dateUtils'
export const ACTION_TYPES = {
  ADD: 'ADD',
  EDIT: 'EDIT',
  DELETE: 'DELETE'
}
interface StateType {
  actionType: string
  selectedRow: object | null
}
interface ActionType {
  type: string
  payload?: any
}

const modelReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case ACTION_TYPES.ADD:
      return {
        ...state,
        actionType: ACTION_TYPES.ADD,
        selectedRow: null
      }

    case ACTION_TYPES.EDIT:
      return {
        ...state,
        actionType: ACTION_TYPES.EDIT,
        selectedRow: action.payload
      }

    case ACTION_TYPES.DELETE:
      return {
        ...state,
        actionType: ACTION_TYPES.DELETE,
        selectedRow: null
      }

    default:
      return state

  }
}

export default function DBContents() {
  const DBContext = useDBContext()
  const activeMenuItem = DBContext.activeMenuItem
  const [fieldsAttr, setFieldsAttr] = useState([])
  const [tableDetail, setTableDetail] = useState({})
  const [dataList, setDataList] = useState([])
  const [showModel, toggleShowModel] = useToggle(false)
  // const [actionType, setActionType] = useState(ACTION_TYPES.ADD)
  const [modelSate, dispatch] = useReducer(modelReducer, {
    actionType: ACTION_TYPES.ADD,
    selectedRow: null
  })

  const fetchDataList = (tablename: string) => {
    if (!tablename) return
    const url = `/api/db/table/${tablename}`
    httpRequest(url)
      .then((data) => {
        setFieldsAttr(data.fieldsAttr)
        setDataList(data.dataList || [])
        setTableDetail(data)
        // console.log('tableInfo:::::', data)
      })
  }

  const filteredFields = useMemo(() => {
    // only read field
    const fieldsOnlyRead = ['createdAt', 'updatedAt']
    if (modelSate.actionType === ACTION_TYPES.ADD) {
      fieldsOnlyRead.push('id')
    }
    return fieldsAttr.filter((item: any) => {
      return !fieldsOnlyRead.includes(item.fieldName)
    })
  }, [fieldsAttr, modelSate])

  const updateItemHandle = (fields: any) => {
    const params = {
      tableName: activeMenuItem.name,
      fields
    }
    // insert or update
    console.log('params', params)
    const url = '/api/db/table/updateRow' // delete
    /**
     * contentType
     *  Post 默认：Content-Type: text/plain;charset=UTF-8
     *
     */
    // fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(params)
    // })
    // .then(async res => {
    //   return await res.json()
    // })
    httpRequest(url, {
      method: 'POST',
      data: params
    })
      .then(data => {
        if (data) {
          fetchDataList(activeMenuItem.name)
          toggleShowModel(false)
        }
      })
  }

  const deleteItemHandle = (id: string) => {
    if (!id) return
    const params = {
      tableName: activeMenuItem.name,
      id
    }
    // insert or update
    console.log('params', params)
    const url = '/api/db/table/delete' //

    httpRequest(url, {
      method: 'POST',
      data: params
    })
      .then(data => {
        if (data) {
          fetchDataList(activeMenuItem.name)
        }
      })
  }

  // const showModelWithTypeHandle = (type) => {
  //   toggleShowModel(true)

  // }

  const dealActionWithTypes = (type: string, id: string | null) => {
    let payload = null

    // if (type === ACTION_TYPES.DELETE || type === ACTION_TYPES.ADD) {
    //   payload = null
    // }

    if (type === ACTION_TYPES.EDIT) {
      payload = dataList.find((item: any) => item.id === id)
    }

    dispatch({ type, payload })

    if (type !== ACTION_TYPES.DELETE) {
      toggleShowModel(true)
    } else {
      // todo delete handle
      deleteItemHandle(id)
    }
  }

  useEffect(() => {
    fetchDataList(activeMenuItem.name)
  }, [activeMenuItem])

  if (!activeMenuItem) {
    return <p>null</p>
  }

  return (
    <div className="db-content">
      <h2>tableName: {activeMenuItem.name}</h2>
      <h2>modelName:{tableDetail.modelName}</h2>
      <h2 style={{ margin: '20px 0' }}>
        <button className="btn" onClick={() => dealActionWithTypes(ACTION_TYPES.ADD, null)}>新增</button>
      </h2>
      <table>
        <thead>
          <tr>
            {fieldsAttr.map((item: any) => (
              <th key={item.fieldName}>{item.fieldName}</th>
            ))}
            <th key='action'>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {dataList.map((row: any, ridx) => {
            return (
              <tr key={ridx}>
                {fieldsAttr.map((item: any, cdx) => {
                  let fieldValue = row[item['field']]
                  if (item.type === 'DATE' && fieldValue) {
                    fieldValue = DateUtils.format(fieldValue)
                  }
                  return <td key={cdx}>{fieldValue}</td>
                })}
                <td key={`action-${ridx}`}>
                  <div className="btn-group">
                    <button className="btn btn-aciton" onClick={() => dealActionWithTypes(ACTION_TYPES.EDIT, row.id)}>编辑</button>
                    <button className="btn btn-aciton" onClick={() => dealActionWithTypes(ACTION_TYPES.DELETE, row.id)}>删除</button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {!showModel ? (
        ''
      ) : (
        <AddItemModel
          fields={filteredFields}
          values={modelSate.selectedRow}
          close={(e: any) => toggleShowModel(false)}
          onFinish={updateItemHandle}
        />
      )}
    </div>
  )
}
