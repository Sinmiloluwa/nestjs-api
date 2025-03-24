import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

type AuthInput = { email: string; password: string; username: string};
type SignInData = { userId: number; username: string; accessToken?: string, password: string};
type AuthResponse = { userId: number; username: string; accessToken: string; email: string }

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private jwtService: JwtService
    ){}

    async validateUser(input: AuthInput) {
        const user = await this.usersService.findByEmail(input.email)

        if(!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return user;
    }

    async login(input: AuthInput): Promise<AuthResponse> {
        const user = await this.validateUser(input);

        if(!user) {
            throw new UnauthorizedException();
        }

        const isPasswordValid = await bcrypt.compare(input.password, user.password)

        if(!isPasswordValid) {
            throw new UnauthorizedException('Invalid Credentials')
        }

        const access_token = await this.jwtService.signAsync({
            sub: user.id,
            username: user.username
        })

        return {
            userId: user.id,
            username: user.username,
            accessToken: access_token,
            email: input.email
        }
    }

    async register(input: AuthInput): Promise<any> {
        const user = await this.validateUser(input);

        if(user) {
            throw new ForbiddenException('User already exists')
        }

        const hashedPassword = await bcrypt.hash(input.password, 12);

        this.usersService.createOne(input.email, input.username, hashedPassword);
    }
}
