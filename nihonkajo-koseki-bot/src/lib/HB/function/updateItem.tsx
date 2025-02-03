import { APIClient } from "../config/ApiClient"

export const updateItem = async (dataStoreId: string, itemId: string, payload: Object) => {
    const request = APIClient()

    return await request.post(`/api/v0/applications/${process.env.NEXT_PUBLIC_PROJECT_ID}/datastores/${dataStoreId}/items/edit/${itemId}`, payload)
}
