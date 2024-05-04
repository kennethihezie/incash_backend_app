import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Helpers } from 'src/lib/helper/helpers';
import { UsersService } from 'src/modules/users/users.service';
import { LoginDto } from './dto/login.dto';
import { AppKeys } from 'src/lib/constants/app_keys';
import { UserDto } from 'src/modules/users/model/dto/user.dto';


@Injectable()
export class AuthenticationService {
    constructor(private userService: UsersService, private jwtService: JwtService, private configService: ConfigService) {}

    async signUp(userDto: UserDto) {
        try{
            const hash = await Helpers.hashData(userDto.password)

        const user = await this.userService.createUser({
            ...userDto,
            password: hash
        })

        const tokens = await this.getTokens(user._id, user.email)
        await this.updateRefreshToken(user._id, tokens.refreshToken)
    
        return { user, tokens }
        } catch(e) {
            throw new BadRequestException('User with email already exits')
        }
    }

    async logIn(loginDto: LoginDto) {
        const exitingUser = await this.userService.getUserByEmail(loginDto.email);

        if (!exitingUser) {
            throw new BadRequestException('User does not exists')
        }

        const passwordMatches = await Helpers.verifyData(exitingUser.password, loginDto.password);
        if (!passwordMatches) {
            throw new BadRequestException('Password is incorrect')
        }

        const tokens = await this.getTokens(exitingUser._id, exitingUser.email)
        await this.updateRefreshToken(exitingUser._id, tokens.refreshToken)

        const user = exitingUser.toObject()

        delete user.password

        return { user, tokens }
    }

    async logout(userId: string) {
        return this.userService.updateUser(userId, { refreshToken: null });
    }

    async refreshToken(userId: string, refreshToken: string) {
        const user = await this.userService.getUser(userId)
        if (!user || !user.refreshToken) {
            throw new ForbiddenException('Access Denied')
        }

        const refreshTokenMatches = await Helpers.verifyData(user.refreshToken, refreshToken)
        if (!refreshTokenMatches) {
            throw new ForbiddenException('Access Denied')
        }

        const tokens = await this.getTokens(user._id, user.email)
        await this.updateRefreshToken(user._id, tokens.refreshToken)

        return { user, tokens }
    }

    async updateRefreshToken(userId: string, refreshToken: string) {
        const hashedRefreshToken = await Helpers.hashData(refreshToken);
        await this.userService.updateUser(userId, { refreshToken: hashedRefreshToken });
    }

    async getTokens(userId: string, email: string) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: userId,
                    email,
                },
                {
                    secret: this.configService.get<string>(AppKeys.jwtSecret),
                    expiresIn: '15m',
                },
            ),
            this.jwtService.signAsync(
                {
                    sub: userId,
                    email,
                },
                {
                    secret: this.configService.get<string>(AppKeys.jwtRefreshSecret),
                    expiresIn: '7d',
                },
            ),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }
}
