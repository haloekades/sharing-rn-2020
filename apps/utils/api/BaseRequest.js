import axios from 'axios';
import { BASE_URL } from "../../config";
import { errorHanlder, responseHandler } from "./Handler";
//import { AsyncStorage } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';

/*
  ONLY USE THIS AXIOS WRAPPER FOR AUTH REQUIRED API
  FOR STANDARDIZATION USE PROMISE INSTEAD OF ASYNC AWAIT ON THE WRAPPER

  option should be
  {
    url: 'url',
    method: 'get'/'post'/'put',
    data: {}
  }
*/

const API_CALL = async option => {
  // call the api
  try {
    // get the token
    // const TOKEN = await AsyncStorage.getItem(authToken);
    // adding the authentication token
    const API_OPTION = {
      baseURL: BASE_URL,
    //   headers: {
    //     authentication: TOKEN
    //   },
      ...option,
    };

    const res = await axios.request(API_OPTION);
    
    return responseHandler(res)
  } catch (error) {
    return errorHanlder(error);
}
};

export { API_CALL };
