import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { map, Observable } from "rxjs";

//help for type safety
//basically it takes a class as an argument
interface ClassConstrutor {
    new (...args: any[]): {}
}

//behind the scenes decorators are just functions
export function Serialize(dto: ClassConstrutor){
   return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any){}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        // Run something before a request is handled by a the request handler

        return next.handle().pipe(
            map((data: any) => {
                //run something before something is sent out
                return plainToClass(this.dto, data, {
                    //make sures everything works perfectly
                    excludeExtraneousValues: true
                })
            })
        )
    }
}