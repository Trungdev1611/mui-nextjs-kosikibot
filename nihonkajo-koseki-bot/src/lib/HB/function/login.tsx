import { APIClient } from "../config/ApiClient"

export const login = async (email: string, password: string, is_code = false) => {
    const request = APIClient()
    if (is_code) {
        return await request.post('/api/v0/login', {
            user_code: email,
            password,
            exclusive_w_id: process.env.PROJECT_ID
        })
    }

    return await request.post('/api/v0/login', {
        email,
        password,
        exclusive_w_id: process.env.PROJECT_ID
    })
}
