import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "name" : "Matthew",
            "email" : "love@gmail.com",
            "role" : "INTERN"
        },
        {
            "id": 2,
            "name" : "Rayden",
            "email" : "roma@gmail.com",
            "role" : "INTERN"
        },
        {
            "id": 3,
            "name" : "James",
            "email" : "james@gmail.com",
            "role" : "ENGINEER"
        },
        {
            "id": 4,
            "name" : "Mark",
            "email" : "mark@gmail.com",
            "role" : "ADMIN"
        }
    ]

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {
            const rolesArray = this.users.filter(user => user.role === role)
            if (!rolesArray.length) {
                throw new NotFoundException('User with role not found')
                return rolesArray;
            }
        }
        return this.users
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id)

        if(!user) {
            throw new NotFoundException('User not found')
        }

        return user
    }

    createOne(user: CreateUserDto) {
        const usersByHighestId = [...this.users].sort((a,b) => b.id - a.id)

        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...user
        }
        
        this.users.push(newUser);
        return newUser
    }

    updateOne(id: number, updatedUser: UpdateUserDto) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return {...user, ...updatedUser}
            }

            return user
        })

        return this.findOne(id)
    }

    deleteOne(id: number) {
        const removedUser = this.findOne(id)

        this.users = this.users.filter(user => user.id !== id)
    }
}
