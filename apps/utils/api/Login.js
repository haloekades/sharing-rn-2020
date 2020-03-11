import { API } from "../../config";
import {API_CALL} from "../api/BaseRequest"
export * from './Handler';

export const loginUser = async (params) => {
    try {
    const option = {
        method: 'POST',
        url: `${API.login}`,
        params: params
      };
      
      const userResponse = await API_CALL(option);

      return userResponse;
    } catch (error) {
        return error;
    }
}
