import { API } from '../../config'
import { API_CALL } from "./BaseRequest"

export const createTask = async (params) =>{
    const option ={
        method : "POST",
        url: `${API.CREATE_TASK}`,
        params: params
    }

    const response = await API_CALL(option)

    return response
}

export const approvedTask = async (params) =>{
    const option ={
        method : "POST",
        url: `${API.APPROVED}`,
        params: params
    }

    const response = await API_CALL(option)

    return response
}

export const rejectedTask = async (params) =>{
    const option ={
        method : "POST",
        url: `${API.REJECTED}`,
        params: params
    }

    const response = await API_CALL(option)

    return response
}