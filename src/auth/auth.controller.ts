import { Body, Controller, NotImplementedException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    login(@Body() input: { email: string; password: string}) {
        return this.authService.login(input);
    }
}
