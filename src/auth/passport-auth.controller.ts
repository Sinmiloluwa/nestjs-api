import { Controller, Post, Get, UseGuards, Body, Inject, Request, BadRequestException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { PassportLocalGuard } from "./passport-local.guard";
import { AuthGuard } from "@nestjs/passport";
import { Cache } from "cache-manager";
import { CACHE_MANAGER } from "@nestjs/cache-manager";


@Controller('pass')
export class PassportAuthController {
    constructor(
        private authService: AuthService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {}


    @Post('login')
    @UseGuards(PassportLocalGuard)
    login(@Body() input: {username: string; password: string}) {
        return this.authService.loginPassport(input)
    }

    @Get('me')
    @UseGuards(PassportLocalGuard)
    async getUserInfo(@Request() req) {
        const email = req.user?.email;  
        if (!email) {
            throw new BadRequestException('Email is required');
        }

        console.log(email);

        let value = await this.cacheManager.get(`user-email-${email}`);

        if (!value) {
            await this.cacheManager.set(`user-email-${email}`, req.user, 1000);
            value = req.user; 
        }

        return value;
    }
}