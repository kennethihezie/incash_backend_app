import { HttpStatus } from "@nestjs/common"
import { Response, Request } from "express"

export class ResponseFormat {
    static handleErrorRespomse(response: Response, request: Request, message: string, statusCode: number) {
        return response.status(statusCode).json({
            statusCode: statusCode,
            timeStamp: new Date().toISOString(),
            path: request.url,
            message: message
        })
    }

    static handleSuccesResponse(response: Response, message: string, status: string, data: any) {
        return response.status(response.statusCode).json({
            statusCode: response.statusCode,
            message: message,
            status: status,
            data: data
        })
    }
}