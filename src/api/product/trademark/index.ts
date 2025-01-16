import request from '@/utils/request'
import type { TradeMark, TradeMarkResponseData } from './type'
enum API {
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  ADD_TRADEMARK_URL = '/admin/product/baseTrademark/save',
  UPDATE_TRADEMARK_URL = '/admin/product/baseTrademark/update',
  DELETE_TRADEMARK_URL = '/admin/product/baseTrademark/remove/',
}

//品牌分页列表
export const reqTradeMark = (page: number, limit: number) => {
  return request.get<any, TradeMarkResponseData>(
    API.TRADEMARK_URL + `${page}/${limit}`,
  )
}

//添加与修改品牌
export const reqAddOrUpdateTradeMark = (data: TradeMark) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATE_TRADEMARK_URL, data)
  } else {
    //新增
    return request.post<any, any>(API.ADD_TRADEMARK_URL, data)
  }
}

//删除
export const reqDeleteTradeMark = (id: number) => {
  return request.delete<any, any>(API.DELETE_TRADEMARK_URL + id)
}
