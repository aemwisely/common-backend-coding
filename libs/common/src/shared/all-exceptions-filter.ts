import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

interface ErrorResponse {
  message?: string | string[];
}

export class AllExceptionsFilter implements ExceptionFilter {
  private logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const error =
      exception instanceof HttpException ? exception.getResponse() : { message: 'error' };

    let errorMessage: string;

    if (typeof error === 'object' && error !== null && 'message' in error) {
      const message = (error as ErrorResponse).message;
      errorMessage = Array.isArray(message) ? message?.[0] : message || 'Unknown error';
    } else {
      errorMessage =
        typeof exception === 'object' && exception !== null && 'message' in exception
          ? (exception as { message: string }).message
          : 'Unknown error';
    }

    this.logger.error(errorMessage);

    response.status(status).json({
      success: false,
      statusCode: status,
      message: errorMessage,
      timestamp: new Date().toISOString(),
    });
  }
}
