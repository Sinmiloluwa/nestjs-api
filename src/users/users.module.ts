import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseService } from 'src/database/database.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [DatabaseModule],
    exports: [UsersService]
})
export class UsersModule {}
