import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerUser(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.register(registerAuthDto)
  }

  @Post('login')
  loginUser(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto)
  }
}
