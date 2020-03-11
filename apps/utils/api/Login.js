import { API } from "../../config"; 
import { errorHanlder } from "./Handler";
import { AsyncStorage } from 'react-native';

export const loginUser = async (params) => {
    let result = null;
    try {
        let idToken     = await AsyncStorage.getItem("TOKEN");
        let options     = { "Content-Type": "application/x-www-form-urlencoded" };
        
        let { data }    = await API_REQUEST(idToken, options).post(API.login, PARSE_DATA(params));

        result = data;
    } catch (error) {
        console.log('error', error);
        result = errorHanlder(error);
    }

    return result;
}
