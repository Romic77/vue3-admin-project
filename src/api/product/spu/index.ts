import request from '@/utils/request'
import type { SpuResponseData } from './type'

enum API {
  SPU_LIST_URL = '/admin/product/',
}

export const reqSpuList = (
  page: number,
  limit: number,
  category3Id: string | number,
) =>
  request.get<any, SpuResponseData>(
    API.SPU_LIST_URL + `${page}/${limit}?category3Id=${category3Id}`,
  )
