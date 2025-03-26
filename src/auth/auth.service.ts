import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';

type AuthInput = { email: string; password: string; username: string};
type PassportInput = {password: string; username: string};
type SignInData = { userId: number; username: string; accessToken?: string, password: string};
type AuthResponse = { userId: number; username: string; accessToken: string; email: string }

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private jwtService: JwtService,
        private mailService: MailerService
    ){}

    async validateUser(input: AuthInput) {
        const user = await this.usersService.findByEmail(input.email);

        return user;
    }

    async confirmPassportUser(input: PassportInput) {
        const user = await this.usersService.findOne(input.username);

        return user;
    }

    async loginPassport(input: PassportInput) {
        const user = await this.confirmPassportUser(input);

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
        }
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

        this.mailService.sendMail({
            to: input.email,
            from: "blvcksimons@gmail.com",
            subject: "Welcome",
            text: "Great to have you",
            html: `<b>Welcome</b>`
        })
    }
}
