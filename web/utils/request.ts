
type headersType = {
  'Content-Type'?: string
  [key: string]: any
} | {} | undefined

// type bodyType = Record<string, any>
interface bodyType {
  [key: string]: any
}

interface requestType {
  method?: string
  headers?: headersType
  data?: bodyType
}

async function parseJSON(response: any) {
  return response.json()
}

function checkStatus(response: any) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
}

// fetch超时处理
const TIMEOUT = 100000
const timeoutFetch = async (request: Request) => {
  const fetchPromise = fetch(request)
  const timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('请求超时')), TIMEOUT)
  })
  return await Promise.race([fetchPromise, timeoutPromise])
}

async function httpRequest(url: string, config?: requestType) {
  const defaultConfig = {
    method: 'GET',
    body: null
  }

  const finalConfig: any = Object.assign({}, defaultConfig, config)

  const headers = new Headers()

  if (finalConfig.method === 'GET') {
    url += obj2Str(finalConfig.data)
  }

  if (finalConfig.method === 'POST') {

    if (finalConfig.body instanceof FormData) {
      // 走默认配置
    } else {
      const body = finalConfig.data
      finalConfig.body = JSON.stringify(body)

      // set content type
      headers.append('Content-Type', 'application/json')

    }

  }

  const requestInit: any = {
    method: finalConfig.method,
    headers
  }

  if (finalConfig.body) {
    requestInit.body = finalConfig.body
  }

  const request = new Request(url, requestInit)

  return await timeoutFetch(request)
    .then(checkStatus)
    .then(parseJSON)
    .catch((err) => {
      console.log(err)
    })

}

/**
 *
 * @param obj {object}
 */
function obj2Str(obj: object | undefined) {
  if (!obj) return ''
  let arr: Array<[string, string] | []> = Object.entries(obj)
  arr = arr.filter(Boolean)
  if (!arr.length) return ''
  const newArr = arr.map(item => item.join('='))
  return '?' + newArr.join('&')
}

function str2Obj(str: string) {
  const set = new URLSearchParams(str)
  return Object.fromEntries(set)
}

export { httpRequest }
