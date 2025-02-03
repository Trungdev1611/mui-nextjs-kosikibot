import { APIClient } from "../config/ApiClient"

export const addUser = async (payload: Object) => {
    const request = APIClient()

    return await request.post('/api/v0/users', payload)
}
