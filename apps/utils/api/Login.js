import { API } from "../../config";
import {API_CALL} from "../api/BaseRequest"
export * from './Handler';

export const loginUser = async (params) => {
    try {
    const option = {
        method: 'post',
        url: `${API.login}`,
        data: params
      };

      const userResponse = await API_CALL(option);

      return userResponse;
    } catch (error) {
        return error;
    }
}
