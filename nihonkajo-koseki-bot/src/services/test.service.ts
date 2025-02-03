import { apiBase } from "@/lib/HB/config/Request"
import { SYSTEM_DATA } from "@/utils/system";
// import { SYSTEM_DATA } from "@/utils/system";

// const appId = ''
// const dataStoreTest = ''

type UrlParams = {
    appId: string;  // SYSTEM_DATA.appId
    dataStoreId: string;  
    itemId?: string;
  };

function buildUrlGetItem(params: UrlParams) {
    let url = ""
    if (params.appId) {
        url += `/applications/${params.appId}`;
      }
      if (params.dataStoreId) {
        url += `/datastores/${params.dataStoreId}`;
      }
      if (params.itemId) {
        url += `/items/details/${params.itemId}`;
      }
      return url 
}

function buildUrlGetList(params: UrlParams) {
  let url = ""
  if (params.appId) {
      url += `/applications/${params.appId}`;
    }
    if (params.dataStoreId) {
      url += `/datastores/${params.dataStoreId}`;
    }

    return url + `/items/search`
}

interface paramsQuery {
    use_or_condition?: boolean,
    page: number,
    per_page: number,
    use_display_id?: boolean,
    return_number_value?: boolean
}
export const paramDefault =  {
  use_or_condition: false,
  page: 3,
  per_page: 2,
  use_display_id: true,
  return_number_value: true
}

class TestService {
   async  getItemSettingServer(payloadUrl: UrlParams, params?:unknown ) {
        const url = buildUrlGetItem(payloadUrl)
        const res = await apiBase.get(url, params )
        return res.data
    }

    async getListSettingServer(payloadUrl: UrlParams, params:paramsQuery) {
      const url = buildUrlGetList(payloadUrl)
      console.log("url", url, '-------', typeof window)
      const res = await apiBase.post(url, {...paramDefault, ...params })
      return res.data
    }
}

const TestAPIService = new TestService()
export default  TestAPIService 