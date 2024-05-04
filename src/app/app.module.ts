import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from 'src/users/users.module';
import { PostsModule } from 'src/posts/posts.module';
import { CommentsModule } from 'src/comments/comments.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppKeys } from 'src/lib/constants/app_keys';
import { AuthenticationModule } from 'src/authentication/authentication.module';


@Module({
  imports: [
    UsersModule,
    AuthenticationModule,
    PostsModule,
    CommentsModule,

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),

    MongooseModule.forRootAsync({
      inject: [ ConfigService ],
      useFactory: (config: ConfigService) => {        
        return {
          uri: config.get<string>(AppKeys.databaseUrl),
          dbName: config.get<string>(AppKeys.databaseName),
          user: config.get<string>(AppKeys.databaseUserName),
          pass: config.get<string>(AppKeys.databasePass)
        }
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
