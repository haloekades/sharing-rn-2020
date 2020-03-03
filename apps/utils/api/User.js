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

    let url = API.allTask;

    if (status == 'PENDING') {
        url = API.pendingTask
    } else if (status == 'APPROVED') {
        url = API.approvedTask
    } else if (status == 'REJECTED') {
        url = API.rejectedTask
    }

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

    let url = API.allApproval;

    if (status == 'PENDING') {
        url = API.pendingApproval
    } else if (status == 'APPROVED') {
        url = API.approvedApproval
    } else if (status == 'REJECTED') {
        url = API.rejectedApproval
    }

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
