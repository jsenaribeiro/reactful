export const GUID = Symbol.for('---guid---')

export const PROXY = Symbol.for('proxy')

export const PRIMITIVES = ["symbol", "string", "number", "undefined", "null", "bigint"]

export const FAILED_SAVE = `failed in save file in `

export const IS_ONLY_FOR_ROUTE = 'is only for default route component directory'

export const SELF_CLOSE_TAGS = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr']

export const QUERY_ERROR = 'The query selector for root element in index.html must be by id or tag name'

export const SERVING = `Serving at http://localhost:{0}\n\n`

export const COMMENTS = '\n\n/* ----- auto-generated code ----- */\n'

export const COLORS = {
   RESET: "\x1b[0m",
   BRIGHT: "\x1b[1m",
   DIM: "\x1b[2m",
   UNDERSCORE: "\x1b[4m",
   BLINK: "\x1b[5m",
   REVERSE: "\x1b[7m",
   HIDDEN: "\x1b[8m",
   FG_BLACK: "\x1b[30m",
   FG_RED: "\x1b[31m",
   FG_GREEN: "\x1b[32m",
   FG_YELLOW: "\x1b[33m",
   FG_BLUE: "\x1b[34m",
   FG_MAGENTA: "\x1b[35m",
   FG_CYAN: "\x1b[36m",
   FG_WHITE: "\x1b[37m",
   FG_GRAY: "\x1b[90m",
   BG_BLACK: "\x1b[40m",
   BG_RED: "\x1b[41m",
   BG_GREEN: "\x1b[42m",
   BG_YELLOW: "\x1b[43m",
   BG_BLUE: "\x1b[44m",
   BG_MAGENTA: "\x1b[45m",
   BG_CYAN: "\x1b[46m",
   BG_WHITE: "\x1b[47m",
   BG_GRAY: "\x1b[100m",
}

export const STATUS_CODE = {
   CONTINUE: 100,
   SWITCHING_PROTOCOLS: 101,
   PROCESSING: 102,
   EARLY_HINTS: 103,
   OK: 200,
   CREATED: 201,
   ACCEPTED: 202,
   NON_AUTHORITATIVE_INFORMATION: 203,
   NO_CONTENT: 204,
   RESET_CONTENT: 205,
   PARTIAL_CONTENT: 206,
   MULTI_STATUS: 207,
   ALREADY_REPORTED: 208,
   IM_USED: 226,
   MULTIPLE_CHOICES: 300,
   MOVED_PERMANENTLY: 301,
   FOUND: 302,
   SEE_OTHER: 303,
   NOT_MODIFIED: 304,
   USE_PROXY: 305,
   TEMPORARY_REDIRECT: 307,
   PERMANENT_REDIRECT: 308,
   BAD_REQUEST: 400,
   UNAUTHORIZED: 401,
   PAYMENT_REQUIRED: 402,
   FORBIDDEN: 403,
   NOT_FOUND: 404,
   METHOD_NOT_ALLOWED: 405,
   NOT_ACCEPTABLE: 406,
   PROXY_AUTHENTICATION_REQUIRED: 407,
   REQUEST_TIMEOUT: 408,
   CONFLICT: 409,
   GONE: 410,
   LENGTH_REQUIRED: 411,
   PRECONDITION_FAILED: 412,
   PAYLOAD_TOO_LARGE: 413,
   URI_TOO_LONG: 414,
   UNSUPPORTED_MEDIA_TYPE: 415,
   RANGE_NOT_SATISFIABLE: 416,
   EXPECTATION_FAILED: 417,
   IM_A_TEAPOT: 418,
   MISDIRECTED_REQUEST: 421,
   UNPROCESSABLE_ENTITY: 422,
   LOCKED: 423,
   FAILED_DEPENDENCY: 424,
   TOO_EARLY: 425,
   UPGRADE_REQUIRED: 426,
   PRECONDITION_REQUIRED: 428,
   TOO_MANY_REQUESTS: 429,
   REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
   UNAVAILABLE_FOR_LEGAL_REASONS: 451,
   INTERNAL_SERVER_ERROR: 500,
   NOT_IMPLEMENTED: 501,
   BAD_GATEWAY: 502,
   SERVICE_UNAVAILABLE: 503,
   GATEWAY_TIMEOUT: 504,
   HTTP_VERSION_NOT_SUPPORTED: 505,
   VARIANT_ALSO_NEGOTIATES: 506,
   INSUFFICIENT_STORAGE: 507,
   LOOP_DETECTED: 508,
   BANDWIDTH_LIMIT_EXCEEDED: 509,
   NOT_EXTENDED: 510,
   NETWORK_AUTHENTICATION_REQUIRED: 511
 }
