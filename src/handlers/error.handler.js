import HTTP_CODES from "../utils/httpCodes.js";
import responseHandler from "./response.handler.js";
const errorHandler = (err, res) => {
    let message = err.message;
    let error = HTTP_CODES.INTERNAL_SERVER_ERROR;

    if (err.type === 'TypeError') {
        message = 'TypeError' + err.value;
        error = HTTP_CODES.BAD_REQUEST;
    }
    if (err.name === 'CastError') {
        message = 'Resource not found with ID of ' + err.value;
        error = HTTP_CODES.NOT_FOUND;
    }
    if (err.code === 11000) {
        message = 'Duplicate field value entered' + err.value;
        error = HTTP_CODES.BAD_REQUEST;
    }
    responseHandler(res, false, error.code, message, {});
};

export default errorHandler;