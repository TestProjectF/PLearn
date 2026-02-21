import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRole } from 'src/entities/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async register(@Body() body: { email: string; password: string; role: UserRole }) {
        return this.authService.register(body.email, body.password, body.role);
    }

    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
        return { token: await this.authService.login(body.email, body.password) };
    }
}