import { HttpException, Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hash, compare } from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/schema/user.schema';
import { Model } from 'mongoose';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ) {}
  
  async register(registerAuthDto: RegisterAuthDto) {
    try {
      const { password } = registerAuthDto;
      const passHashed = await hash(password, 10);
      registerAuthDto = {...registerAuthDto, password: passHashed};
      return this.userModel.create(registerAuthDto);
    } catch (error) {
      console.log(error)
    }
  }

  async login(loginAuthDto: LoginAuthDto) {
    try {
      const { email, password } = loginAuthDto;
      const findUser = await this.userModel.findOne({email});
      if (!findUser) throw new HttpException('user not found', 404);
      const check = await compare(password, findUser.password);
      if(!check) throw new HttpException('pass incorrect', 403);
      const payload = {email: findUser.email, role: findUser.role}
      const token = this.jwtService.sign(payload);

      return {
        name: findUser.name,
        token
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
