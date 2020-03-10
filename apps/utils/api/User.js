import { API } from "../../config";
import {API_CALL} from "../api/BaseRequest"
export * from './Handler';

export const getUser = async () => {
    try {
    const option = {
        method: 'get',
        url: `${API.users}`
      };

      const userResponse = await API_CALL(option);

      return userResponse;
    } catch (error) {
        return error;
    }
}

export const getUserTasks = async (status) => {

    let url = API.task;

    if (status != null)
        url = API.task + `type=task&status=${status}`

    try {
    const option = {
        method: 'get',
        url: `${url}`
      };

      const userResponse = await API_CALL(option);
      
      return userResponse;
    } catch (error) {
        return error;
    }
}

export const getUserApporval = async (status) => {

    let url = API.task;

    if (status != null)
        url = API.task + `type=approval&status=${status}`

    try {
    const option = {
        method: 'get',
        url: `${url}`
      };

      const userResponse = await API_CALL(option);
      
      return userResponse;
    } catch (error) {
        return error;
    }
}
