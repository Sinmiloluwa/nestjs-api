import { Controller, Post, Get, UseGuards, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { PassportLocalGuard } from "./passport-local.guard";
import { AuthGuard } from "@nestjs/passport";


@Controller('pass')
export class PassportAuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    @UseGuards(PassportLocalGuard)
    login(@Body() input: {username: string; password: string}) {
        return this.authService.loginPassport(input)
    }

    @Get('me')
    @UseGuards(PassportLocalGuard)
    getUserInfo() {
        console.log('new')
    }
}