import { Body, Controller, NotImplementedException, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    login(@Body() input: { email: string; password: string; username: string}) {
        return this.authService.login(input);
    }

    @Post('register')
    register(@Body() input: { email: string; password: string; username: string}) {
        return this.authService.register(input);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
