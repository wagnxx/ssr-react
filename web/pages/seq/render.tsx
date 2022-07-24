import React, { useContext, useState } from 'react'
import { SProps, IContext } from 'ssr-types-react'
import { IData } from '~/typings/data'
import { STORE_CONTEXT } from '_build/create-context'
import CategoryNav from './components/CategoryNav'
import './index.less'
import { httpRequest } from '@/utils/request'
import Loading from '@/components/loading/Loading'

export default function Index(props: SProps) {
  // const { state, dispatch } = useContext<IContext<IData>>(STORE_CONTEXT)
  const [isLoading, setIsLoading] = useState(false)
  const [json, setJson] = useState({})
  const navChanged = (source, target) => {
    if (!source || !target) return
    setIsLoading(true)
    const url = '/api/db/table/assoiationRow'
    httpRequest(url, {
      method: 'POST',
      data: {
        source,
        target
      }
    })
      .then(data => {
        setJson(data)
        setIsLoading(false)
      })
  }
  return (
    <>
      {
        isLoading
          ? <Loading />
          : null
      }
      <div className="page">
        <CategoryNav onChange={navChanged}/>
        <div className="page-content">
          <h2>content</h2>
          <div>
          </div>
          <div className="json-view">
            <pre>
              {JSON.stringify(json, null, 2)}
            </pre>
          </div>
        </div>
      </div>

    </>
  )
}
