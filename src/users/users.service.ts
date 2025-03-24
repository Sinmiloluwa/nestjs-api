import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
    constructor(private readonly databaseService: DatabaseService) {}

    async findByEmail(email: string) {
        const user = await this.databaseService.user.findUnique({
            where: {
                email,
            }
        })

        return user;
    }

    async createOne(email: string, username: string, password: string) {
       return await this.databaseService.user.create({
            data: {
                email,
                username,
                password
            }
        })
    }
}
