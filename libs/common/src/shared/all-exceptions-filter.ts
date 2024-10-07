import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

export class AllExceptionsFilter implements ExceptionFilter {
  private logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const error = exception instanceof HttpException ? exception.getResponse() : 'error';
    const errorMessage = Array.isArray(error['message'])
      ? error['message'][0]
      : error['message']
      ? error['message']
      : exception['message'];

    this.logger.error(errorMessage);

    response.status(status).json({
      success: false,
      statusCode: status,
      message: errorMessage,
      timestamp: new Date().toISOString(),
    });
  }
}
