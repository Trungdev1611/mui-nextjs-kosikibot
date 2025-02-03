import { APIClient } from "../config/ApiClient"

export const getUserInfo = async () => {
    const request = APIClient()
    return await request.get('/api/v0/userinfo')
}
