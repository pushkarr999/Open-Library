//? Information responses
export const CONTINUE: number = 100;
export const SWITCHING_PROTOCOL: number = 101;
export const EARLY_HINTS: number = 103;

//* Successful responses
export const SUCCESSFUL: number = 200;
export const CREATED: number = 201;
export const ACCEPTED: number = 202;
// 203 NON-AUTHORITATIVE INFORMATION
export const NO_CONTENT: number = 204;
export const RESET_CONTENT: number = 205;
export const PARTIAL_CONTENT: number = 206;
export const MULTI_STATUS: number = 207;

//? Redirection messages
export const MULTIPLE_CHOICES: number = 300;
export const MOVED_PERMANENTLY: number = 301;
export const FOUND: number = 302;
export const SEE_OTHER: number = 303;
export const NOT_MODIFIED: number = 304;
export const TEMPORARY_REDIRECT: number = 307;
export const PERMANENT_REDIRECT: number = 308;

//! Client error responses
export const BAD_REQUEST: number = 400;
export const UNAUTHORIZED: number = 401;
export const PAYMENT_REQUIRED: number = 402;
export const FORBIDDEN: number = 403;
export const NOT_FOUND: number = 404;
export const NOT_ALLOWED: number = 405;
export const NOT_ACCEPTABLE: number = 406;
// 407 Proxy Authentication Required
export const REQUEST_TIMEOUT: number = 408;
export const DUPLICATE: number = 409;
export const GONE: number = 410;
// 412 Precondition Failed
export const TOO_MANY_REQUESTS: number = 429;

//! Server error responses
export const INTERNAL_SERVER_ERROR: number = 500;
export const BAD_GATEWAY: number = 502;
export const SERVICE_UNAVAILABLE: number = 503;
export const GATEWAY_TIMEOUT: number = 504;
