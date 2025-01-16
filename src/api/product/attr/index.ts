import request from '@/utils/request'
import type { Attr, AttrResponseData } from './type'

enum API {
  CATEGORY_ONE_URL = '/admin/product/getCategory1',
  CATEGORY_TWO_URL = '/admin/product/getCategory2/',
  CATEGORY_THREE_URL = '/admin/product/getCategory3/',
  CATEGORY_ATTR_LIST_URL = '/admin/product/attrInfoList/',
  ADD_UPDATE_ATTR_URL = '/admin/product/saveAttrInfo',
  DELETE_ATTR_URL = '/admin/product/deleteAttr/',
}

export const reqOneCategory = () => request.get<any, any>(API.CATEGORY_ONE_URL)

export const reqTwoCategory = (category1Id: number | string) =>
  request.get<any, any>(API.CATEGORY_TWO_URL + category1Id)

export const reqThreeCategory = (category2Id: number | string) =>
  request.get<any, any>(API.CATEGORY_THREE_URL + category2Id)

export const reqCategoryAttrList = (
  category1Id: number | string,
  category2Id: number | string,
  category3Id: number | string,
) =>
  request.get<any, AttrResponseData>(
    API.CATEGORY_ATTR_LIST_URL + `${category1Id}/${category2Id}/${category3Id}`,
  )

export const reqAddOrUpdateAttr = (data: Attr) =>
  request.post<any, any>(API.ADD_UPDATE_ATTR_URL, data)

export const reqDeleteAttr = (id: number) =>
  request.delete<any, any>(API.DELETE_ATTR_URL + id)
