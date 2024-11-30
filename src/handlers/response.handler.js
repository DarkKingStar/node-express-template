const responseHandler = async ( res, success, code, message, data) => {
    res.status(code).json({
        success,
        code,
        message,
        data,
    });
};

export default responseHandler;