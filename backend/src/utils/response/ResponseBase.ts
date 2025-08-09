export interface ResponseBase<T = any> {
  success: boolean;
  message: string;
  data?: T;           // present when success
  errorCode?: string; // optional error code when failure
  errors?: any;       // optional detailed errors (e.g. validation)
}

export function successResponse<T>(data: T, message = 'Success'): ResponseBase<T> {
  return {
    success: true,
    message,
    data,
  };
}

export function errorResponse(message: string, errorCode?: string, errors?: any): ResponseBase<null> {
  return {
    success: false,
    message,
    errorCode,
    errors,
  };
}
