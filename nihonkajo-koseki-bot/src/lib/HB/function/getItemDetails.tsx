import { APIClient } from "../config/ApiClient"

export const getItemDetails = async (dataStoreId: string, itemId: string) => {
    const request = APIClient()

    return await request
        .get(
            `/api/v0/applications/${process.env.NEXT_PUBLIC_PROJECT_ID}/datastores/${dataStoreId}/items/details/${itemId}`
        )
}
