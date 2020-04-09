
const RATE_LIST = [
  5, 4, 3, 2, 1, 0
]

const ORDER_LIST = [
  {
    label: '按拍摄时间由近到远',
    value: 'ptime_etf'
  },
  {
    label: '按拍摄时间由远到近',
    value: 'ptime_fte'
  },
  {
    label: '按上传时间由近到远',
    value: 'utime_etf'
  },
  {
    label: '按上传时间由远到近',
    value: 'utime_fte'
  },
  {
    label: '按名称由 A 到 Z',
    value: 'name_atz'
  },
  {
    label: '按名称由 Z 到 A',
    value: 'name_zta'
  },
  {
    label: '按等级由高到低',
    value: 'rate_5t0'
  },
  {
    label: '按等级由低到高',
    value: 'rate_0t5'
  },
  {
    label: '按文件体积由大到小',
    value: 'file_lts'
  },
  {
    label: '按文件体积由小到大',
    value: 'file_stl'
  }
]

export default {
  RATE_LIST,
  ORDER_LIST
}
