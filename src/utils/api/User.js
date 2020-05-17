import { API } from '../../config'
import { API_CALL } from "./BaseRequest"

export const getUser = async () =>{
    const option ={
        method : "get",
        url: `${API.USER}`,
    }

    const response = await API_CALL(option)

    return response
}