import { Body, ClassSerializerInterceptor, Controller, Get, HttpStatus, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppCodes } from 'src/lib/constants/app_code';
import { AppMessages } from 'src/lib/constants/app_messages';
import { AuthenticationService } from './authentication.service';
import { LoginDto } from './dto/login.dto';
import { AccessTokenGuard } from './guard/access-token.guard';
import { RefreshTokenGuard } from './guard/refresh-token.guard';
import { UserDto } from 'src/modules/users/model/dto/user.dto';
import { ResponseFormat } from 'src/lib/exception/request_format';


// @UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Post('signup')
  async signUp(@Body() userDto: UserDto, @Res() response: Response) {    
    return ResponseFormat.handleSuccesResponse(response, AppMessages.USER_CREATED, AppCodes.SUCCESSFUL, await this.authenticationService.signUp(userDto))
  }

  @Post('login')
  async logIn(@Body() loginDto: LoginDto, @Res() response: Response) {
    return ResponseFormat.handleSuccesResponse(response, AppMessages.USERS_LOGIN, AppCodes.SUCCESSFUL, await this.authenticationService.logIn(loginDto))
  }


  @UseGuards(AccessTokenGuard)
  @Get('logout')
  async logOut(@Req() req: Request, @Res() response: Response){
    const userId = req.user['sub']
    return ResponseFormat.handleSuccesResponse(response, AppMessages.USERS_LOGOUT, AppCodes.SUCCESSFUL, await this.authenticationService.logout(userId))
  }


  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refreshTokens(@Req() req: Request, @Res() response: Response) {
    const userId = req.user['sub']
    const refreshToken = req.user['refreshToken']

    return ResponseFormat.handleSuccesResponse(response, AppMessages.TOKEN_REFRESHED, AppCodes.SUCCESSFUL, await this.authenticationService.refreshToken(userId, refreshToken))
  }
}
