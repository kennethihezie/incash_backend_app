import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from 'src/lib/exception/app_exception';


@Module({
  imports: [ JwtModule.register({}), UsersModule ],
  controllers: [AuthenticationController],
  providers: [ 
    AuthenticationService, 
    AccessTokenStrategy, 
    RefreshTokenStrategy,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    },
  ]
})
export class AuthenticationModule {}