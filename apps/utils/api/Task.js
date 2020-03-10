import { API } from "../../config";
import {API_CALL} from "../api/BaseRequest"
export * from './Handler';

export const createTask = async (params) => {
    try {
    const option = {
        method: 'POST',
        url: `${API.createTask}`,
        params : params
      };

      const response = await API_CALL(option);

      return response;
    } catch (error) {
        return error;
    }
}

export const approvedTask = async (params) => {
    try {
    const option = {
        method: 'POST',
        url: `${API.approved}`,
        params : params
      };

      const response = await API_CALL(option);

      return response;
    } catch (error) {
        return error;
    }
}

export const rejectedTask = async (params) => {
    try {
    const option = {
        method: 'POST',
        url: `${API.rejected}`,
        params : params
      };

      const response = await API_CALL(option);

      return response;
    } catch (error) {
        return error;
    }
}