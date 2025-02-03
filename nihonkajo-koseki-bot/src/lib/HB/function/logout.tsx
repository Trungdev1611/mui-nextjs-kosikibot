import { APIClient } from "../config/ApiClient"

export const login = async () => {
    const request = APIClient()
    return await request.post('/api/v0/users/logout', {})
}
