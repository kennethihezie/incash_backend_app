import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { AppKeys } from "src/lib/constants/app_keys"

type JwtPayload = {
    sub: string
    email: string
}

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get<string>(AppKeys.jwtSecret)
        })
    }

    validate(payload: JwtPayload){
        return payload
    }
}