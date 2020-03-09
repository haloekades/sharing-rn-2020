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

    // const API_OPTION = {
    //   baseURL: BASE_URL,
    //   headers: {
    //     // 'Content-Type' : 'application/x-www-form-urlencoded'
    //     authentication: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjMsImlhdCI6MTU4MzcwOTExNX0.zHzfW10HHFILiHU6Jv2ZRMiU2QM88H7ePQ7LqXiKNYs`
    //   },
    //   ...option,
    // };

    // console.log('base req', API_OPTION)
    // const res = await axios.request(API_OPTION);
    // console.log('base res', res)

    // return responseHandler(res)

    let requestAxios = null
    console.log('option', option)

    switch (option.method) {
      case 'get':

        requestAxios = axios.get(BASE_URL + option.url, {
          headers: {
            "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjMsImlhdCI6MTU4MzcwOTExNX0.zHzfW10HHFILiHU6Jv2ZRMiU2QM88H7ePQ7LqXiKNYs",
          }
        })
        console.log('get')
        break
      case 'post':
        requestAxios = axios.post(BASE_URL + option.url, {
          email: 'admin@gmail.com',
          password: '12345',
        }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;'
          }
        })
        console.log('post')
        break
      case 'put':
        break;

      default:
        requestAxios = null
        break

    }

    if (requestAxios != null) {
      console.log('req axios', requestAxios)
      requestAxios.then(response => {
        console.log('res axios', response)
        return responseHandler(response)
      })
      requestAxios.catch(err => {
        console.log('error axios', err)
        return errorHanlder(err)
      })

      return requestAxios;
    }

  } catch (error) {
    console.log('error res', error)
    return errorHanlder(error);
  }
};

export { API_CALL };
