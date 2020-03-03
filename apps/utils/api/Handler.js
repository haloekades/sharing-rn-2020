import { HttpStatusCode } from '../../config';

// convert to minimal response from axios
export const responseHandler    = (res) => {
    return res.data
}

// conver error response from axios
export const errorHanlder       = (error) => {
    let response = { code: null, message: null };

    if (!error.response) {
        response = { code: `00`, message: 'No network connected' };
    } else {
        response = statusCode(error.response.status);
    }

    return response;
}

// get message status code
const statusCode    = (code) => {
    return HttpStatusCode.find(function(element) {
        return element.code == code;
    });
}