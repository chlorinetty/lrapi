export enum ErrorCode {
  GENERAL_EXCEPTION,

  AUTHORIZATION_WRONG_CREDENTIALS,
  AUTHORIZATION_MALFORMED_CREDENTIALS,
  AUTHORIZATION_EXPIRED_TOKEN,
  AUTHORIZATION_BAD_SESSION,
  AUTHORIZATION_NOT_AUTHORIZED,
}

interface ErrorInformation {
  code: string;
  message: string;
}

export interface ErrorModel {
  error: ErrorInformation;
}
