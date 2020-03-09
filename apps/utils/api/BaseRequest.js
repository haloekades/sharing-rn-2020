import axios from 'axios';
import { BASE_URL, API } from "../../config";
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


    var formBody = [];
    if (option.params) {
        for (var property in option.params) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(option.params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
    }

    const API_OPTION = {
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Authorization': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjMsImlhdCI6MTU4MzcwOTExNX0.zHzfW10HHFILiHU6Jv2ZRMiU2QM88H7ePQ7LqXiKNYs`
      },
      data : formBody,
      ...option,
    };


    // var formBody = [];
    // if (options.params) {
    //     for (var property in params) {
    //         var encodedKey = encodeURIComponent(property);
    //         var encodedValue = encodeURIComponent(params[property]);
    //         formBody.push(encodedKey + "=" + encodedValue);
    //     }
    //     formBody = formBody.join("&");
    // }

    console.log('base req', API_OPTION)
    const res = await axios.request(API_OPTION);
    console.log('base res', res)

    return responseHandler(res)
  } catch (error) {
    console.log('error res', error)
    return errorHanlder(error);
  }
};

export { API_CALL };
