import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  
  findAll() {
    try {
      const list = this.userModel.find()
      return list;
    } catch (error) {
      console.log(error)
    }
  }

  create(createUserDto: CreateUserDto) {
    try {
      this.userModel.create(createUserDto)
      true
    } catch (error) {
      console.log(error)
    }
  }

  /* 
  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  } */
}
