const HTTP_CODES = {
    // Success
    OK: { code: 200, message: "Success" },
    CREATED: { code: 201, message: "Created" },
    ACCEPTED: { code: 202, message: "Accepted" },
    NO_CONTENT: { code: 204, message: "No Content" },

    // Redirection
    MOVED_PERMANENTLY: { code: 301, message: "Moved Permanently" },
    FOUND: { code: 302, message: "Found" },
    NOT_MODIFIED: { code: 304, message: "Not Modified" },

    // Client Errors
    BAD_REQUEST: { code: 400, message: "Bad Request" },
    UNAUTHORIZED: { code: 401, message: "Unauthorized" },
    PAYMENT_REQUIRED: { code: 402, message: "Payment Required" },
    FORBIDDEN: { code: 403, message: "Forbidden" },
    NOT_FOUND: { code: 404, message: "Not Found" },
    METHOD_NOT_ALLOWED: { code: 405, message: "Method Not Allowed" },
    NOT_ACCEPTABLE: { code: 406, message: "Not Acceptable" },
    REQUEST_TIMEOUT: { code: 408, message: "Request Timeout" },
    CONFLICT: { code: 409, message: "Conflict" },
    GONE: { code: 410, message: "Gone" },
    LENGTH_REQUIRED: { code: 411, message: "Length Required" },
    PRECONDITION_FAILED: { code: 412, message: "Precondition Failed" },
    PAYLOAD_TOO_LARGE: { code: 413, message: "Payload Too Large" },
    UNSUPPORTED_MEDIA: { code: 415, message: "Unsupported Media" },
    RANGE_NOT_SATISFIABLE: { code: 416, message: "Range Not Satisfiable" },
    EXPECTATION_FAILED: { code: 417, message: "Expectation Failed" },
    UNPROCESSABLE_ENTITY: { code: 422, message: "Unprocessable Entity" },
    FAILED_DEPENDENCY: { code: 424, message: "Failed Dependency" },
    TOO_MANY_REQUESTS: { code: 429, message: "Too Many Requests" },

    // Server Errors
    INTERNAL_SERVER_ERROR: { code: 500, message: "Internal Server Error" },
    NOT_IMPLEMENTED: { code: 501, message: "Not Implemented" },
    BAD_GATEWAY: { code: 502, message: "Bad Gateway" },
    SERVICE_UNAVAILABLE: { code: 503, message: "Service Unavailable" },
    GATEWAY_TIMEOUT: { code: 504, message: "Gateway Timeout" },
    HTTP_VERSION_NOT_SUPPORTED: { code: 505, message: "HTTP Version Not Supported" },
    NETWORK_AUTHENTICATION_REQUIRED: { code: 511, message: "Network Authentication Required" }
};

export default HTTP_CODES;
