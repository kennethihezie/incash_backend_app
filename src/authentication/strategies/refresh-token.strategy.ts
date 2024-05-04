import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AppKeys } from "src/lib/constants/app_keys";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get<string>(AppKeys.jwtRefreshSecret),
            passReqToCallback: true,
        })
    }

    validate(req: Request, payload: any){
        const refreshToken = req.get('Authorization').replace('Bearer', '').trim()
        return { ...payload, refreshToken }
    }
}