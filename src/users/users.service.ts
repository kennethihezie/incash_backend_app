import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './model/schema/user.schema';
import { UserDto } from './model/dto/user.dto';
import { UpdateUserDto } from './model/dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async createUser(userDto: UserDto): Promise<User> {
        return await (new this.userModel(userDto).save())
    }

    async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<User> {                
        const user = await this.userModel.findByIdAndUpdate(userId, updateUserDto, {
            new: true,
            projection: { password: 0 }
        })        

        if(!user) {
            throw new NotFoundException(`User with id: ${userId} not found`)
        }

        return user
    }

    async getUser(userId: string): Promise<User> {
        const user = await this.userModel.findById(userId, { password: 0 })

        if(!user){
            throw new NotFoundException('User not found!')
        }

        return user
    }

    async getUserBeforeLogin(email: string): Promise<User | null> {
        const user = await this.userModel.findOne({ email }).exec()

        if(!user){
            return null;
        }

        return user
    }


    async getUserByEmail(email: string): Promise<User | null> {
        const user = await this.userModel.findOne({ email }).exec()

        if(!user){
            return null;
        }

        return user
    }

    async getAllUsers(): Promise<User[]> {
        const users = await this.userModel.find({}, { password: 0 }).exec()
        if(!users || users.length == 0){
            throw new NotFoundException('Users data not found!')
        }

        return users
    }

    async deleteUser(userId: string): Promise<User> {
        const user = await this.userModel.findByIdAndDelete(userId, { password: 0 })        

        if(!user){
            throw new NotFoundException(`User with id: ${userId} not found`)
        }

        return user
    }
}
