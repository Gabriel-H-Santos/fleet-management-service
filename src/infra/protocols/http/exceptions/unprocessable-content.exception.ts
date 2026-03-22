import { HTTPStatus } from '@infra/protocols/http/enums/status-code.enum';
import { BaseHttpException, BaseHttpExceptionMetadata } from './base-http.exception';

export class UnprocessableContent extends BaseHttpException {
  constructor(
    message: string,
    errorCode: string,
    metadata?: BaseHttpExceptionMetadata,
  ) {
    super(message, errorCode, HTTPStatus.UNPROCESSABLE_CONTENT, metadata);
  }
}
