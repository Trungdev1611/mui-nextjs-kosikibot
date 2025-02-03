import { APIClient } from "../config/ApiClient"

export const deleteItem = async (dataStoreId: string, itemId: string, payload: Object) => {
    const request = APIClient()
    return await request.post(`/api/v0/applications/${process.env.NEXT_PUBLIC_PROJECT_ID}/datastores/${dataStoreId}/items/delete/${itemId}`, payload)
}
