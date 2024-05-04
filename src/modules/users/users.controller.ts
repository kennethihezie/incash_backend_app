import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { AppMessages } from 'src/lib/constants/app_messages';
import { AppCodes } from 'src/lib/constants/app_code';
import { UpdateUserDto } from './model/dto/update-user.dto';
import { UserDto } from './model/dto/user.dto';
import { AccessTokenGuard } from 'src/modules/authentication/guard/access-token.guard';
import { ResponseFormat } from 'src/lib/exception/request_format';

@UseGuards(AccessTokenGuard)
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post()
    async createUser(@Body() userDto: UserDto, @Res() response: Response) {
        return ResponseFormat.handleSuccesResponse(response, AppMessages.USER_CREATED, AppCodes.SUCCESSFUL, await this.userService.createUser(userDto))
    }

    @Patch('/:id')
    async updateUser(@Param('id') userId: string, @Body() updateUserDto: UpdateUserDto, @Res() response: Response) {
        return ResponseFormat.handleSuccesResponse(response, AppMessages.USER_UPDATED, AppCodes.SUCCESSFUL, await this.userService.updateUser(userId, updateUserDto))
    }

    @Get()
    async getAllUsers(@Res() response: Response) {
        return ResponseFormat.handleSuccesResponse(response, AppMessages.USERS_FETCHED, AppCodes.SUCCESSFUL, await this.userService.getAllUsers())
    }

    @Get('/:id')
    async getUser(@Param('id') userId: string, @Res() response: Response) {
        return ResponseFormat.handleSuccesResponse(response, AppMessages.USER_FETCHED, AppCodes.SUCCESSFUL, await this.userService.getUser(userId))
    }

    @Delete('/:id')
    async deleteUser(@Param('id') userId: string, @Res() response: Response) {
        return ResponseFormat.handleSuccesResponse(response, AppMessages.USER_DELETED, AppCodes.SUCCESSFUL, await this.userService.deleteUser(userId))
    }
}
