import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}
   
    // @Get()
    // findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    //     return this.usersService.findAll(role)
    // }

    // @Get(':id')
    // findOne(@Param('id', ParseIntPipe) id: number) {
    //     return this.usersService.findOne(id)
    // }

    // @Post()
    // createOne(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    //     return this.usersService.createOne(createUserDto)
    // }

    // @Put(':id')
    // updateOne(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) userUpdate: UpdateUserDto) {
    //     return this.usersService.updateOne(id, userUpdate)
    // }

    // @Delete(':id')
    // deleteOne(@Param('id', ParseIntPipe) id: number) {
    //     return this.usersService.deleteOne(id)
    // }
}

