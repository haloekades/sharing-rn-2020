import axios from 'axios';
import { BASE_URL, API } from "../../config";
import { errorHanlder, responseHandler } from "./Handler";
import { AsyncStorage } from 'react-native';
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
    let authToken = '';

    const token = await AsyncStorage.getItem("TOKEN");
    if(token != null && token != ''){
      authToken = token
    }

    const API_OPTION = {
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Authorization': `${authToken}`,
        'Cache-Control': 'no-cache'
      },
      // cache: false,
      ...option,
    };

    var formBody = [];
    if (option.params) {
        for (var property in option.params) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(option.params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        API_OPTION.data = formBody
    }

    const res = await axios.request(API_OPTION);

    return responseHandler(res)
  } catch (error) {
    return errorHanlder(error);
  }
};

export { API_CALL };
