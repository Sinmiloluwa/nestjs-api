import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseService } from 'src/database/database.service';

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [DatabaseService]
})
export class UsersModule {}
