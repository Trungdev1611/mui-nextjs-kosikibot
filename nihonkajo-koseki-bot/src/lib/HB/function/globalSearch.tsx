import { APIClient } from "../config/ApiClient"

export const globalSearch = async (payload: Object) => {
    const request = APIClient()

    return await request.post('/api/v0/globalsearch', payload)
}
