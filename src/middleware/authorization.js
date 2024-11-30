import responseHandler from "../handlers/response.handler.js";
import HTTP_CODES from "../utils/httpCodes.js";
import JWT from "../utils/jwt.js";

const validateAccessToken = (allowedRoles = []) => async (req, res, next) => {
    try {
        // Check if the Authorization header is present
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return responseHandler(res, false, HTTP_CODES.UNAUTHORIZED.code, "Access token missing in the request.", {});
        }

        // Extract the token from the Authorization header
        const token = authHeader.split(' ')[1];

        // Verify the token 
        const decodedToken = JWT.verifyToken(token, process.env.JWT_SECRET);

        // Check if user roles match allowed roles (if any are specified)
        if (allowedRoles.length > 0 && !allowedRoles.includes(decodedToken.role)) {
            return responseHandler(res, false, HTTP_CODES.FORBIDDEN.code, "You are not authorized to access this resource.", {});
        }

        // Attach decoded token or user data to the request for further use
        req.user = decodedToken;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return responseHandler(res, false, HTTP_CODES.UNAUTHORIZED.code, "Access token provided is Invalid", {});
        }
        if (error.name === 'TokenExpiredError') {
            return responseHandler(res, false, HTTP_CODES.UNAUTHORIZED.code, `Access token provided is Expired at ${error?.expiredAt}`, {});
        }
        next(error); // Forward other errors to the error handler
    }
}



export default {validateAccessToken};
