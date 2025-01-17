import request from '@/utils/request'
import type {
  SpuResponseData,
  AllTradeMark,
  SpuHasImg,
  SaleAttrResponseData,
  HasSaleAttrResponseData,
  SpuData,
  SkuData,
  SkuInfoData,
} from './type'

enum API {
  SPU_LIST_URL = '/admin/product/',
  TRADEMARK_LIST_URL = '/admin/product/baseTrademark/getTrademarkList',
  IMAGE_URL = '/admin/product/spuImageList/',
  SPU_SALE_ATTR_LIST_URL = '/admin/product/spuSaleAttrList/',
  ALL_SALE_ATTR_URL = '/admin/product/baseSaleAttrList',
  UPDATE_SPU_URL = '/admin/product/updateSpuInfo',
  SAVE_SPU_URL = '/admin/product/saveSpuInfo',
  ADDSKU_URL = '/admin/product/saveSkuInfo',
  SKUINFO_URL = '/admin/product/findBySpuId/',
  REMOVESPU_URL = '/admin/product/deleteSpu/',
}

export const reqSpuList = (
  page: number,
  limit: number,
  category3Id: string | number,
) =>
  request.get<any, SpuResponseData>(
    API.SPU_LIST_URL + `${page}/${limit}?category3Id=${category3Id}`,
  )

export const reqAllTradeMark = () =>
  request.get<any, AllTradeMark>(API.TRADEMARK_LIST_URL)

export const reqSpuImageList = (spuId: number) =>
  request.get<any, SpuHasImg>(API.IMAGE_URL + spuId)

export const reqSpuSaleAttrList = (spuId: number) =>
  request.get<any, SaleAttrResponseData>(API.SPU_SALE_ATTR_LIST_URL + spuId)

export const reqAllSaleAttrList = () =>
  request.get<any, HasSaleAttrResponseData>(API.ALL_SALE_ATTR_URL)

export const reqAddOrUpdateSpu = (data: SpuData) => {
  if (data.id) {
    return request.post<any, any>(API.UPDATE_SPU_URL, data)
  } else {
    return request.post<any, any>(API.SAVE_SPU_URL, data)
  }
}

export const reqAddSku = (data: SkuData) =>
  request.post<any, any>(API.ADDSKU_URL, data)

export const reqSkuList = (spuId: number | string) =>
  request.get<any, SkuInfoData>(API.SKUINFO_URL + spuId)

export const reqRemoveSpu = (spuId: number | string) =>
  request.delete<any, any>(API.REMOVESPU_URL + spuId)
