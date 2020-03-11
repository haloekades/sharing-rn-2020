import _ from 'lodash';
import axios from 'axios';
import { API_URL } from '../../config';

const API_REQUEST = (idToken, header_params = null) => {
    try {
        let payload = {
            baseURL: `${API_URL}`,
        };

        let headers = { 'Authorization': idToken };
        
        if (!_.isEmpty(header_params)) {
            _.assign(headers, header_params);
        }
        
        if (!_.isEmpty(idToken)) {
            _.assign(payload, { headers });
        }
        
        return axios.create(payload)
    } catch (err) {
        console.error('Axios error')
    }
};

const PARSE_DATA  = (params) => {
    let formBody    = [];
    if (params) {
        for (var property in params) {
            var encodedKey      = encodeURIComponent(property);
            var encodedValue    = encodeURIComponent(params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
    }

    return formBody;
}


export { API_REQUEST, PARSE_DATA };