import HTTP_CODES from "../utils/httpCodes.js";
import responseHandler from "./response.handler.js";


const routeHandler = async (req, res) => {
    const route = req.params.route;
    responseHandler(res, false, HTTP_CODES.NOT_FOUND.code, HTTP_CODES.NOT_FOUND.message, {route: route});
};

export default routeHandler;