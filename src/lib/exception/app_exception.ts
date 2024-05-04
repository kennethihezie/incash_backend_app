import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from 'express';
import { ResponseFormat } from "./request_format";
import { MongooseError } from "mongoose";


@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()


        
        if(exception instanceof HttpException){                    
          ResponseFormat.handleErrorRespomse(response, request, exception.message, exception.getStatus())
        } else if(exception.name === 'JsonWebTokenError' || exception.name === 'TokenExpiredError') {
          ResponseFormat.handleErrorRespomse(response, request, exception.message, 400)
        } else if(exception.name === 'CastError') {
          ResponseFormat.handleErrorRespomse(response, request, exception.message, 400)
        } else {
          ResponseFormat.handleErrorRespomse(response, request, exception.message, 400)
        }
    }
}