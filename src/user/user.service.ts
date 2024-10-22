import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name)private userModel: Model<User>) {}

  create(createUserDto: CreateUserDto) {
    return  this.userModel.create(createUserDto);
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(id) {
    return this.userModel.findById(id).populate("posts" ,"content title");
  }

   async update(id, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findById(id)
    if (!user) throw new  NotFoundException
    const updateUser = await this.userModel.findByIdAndUpdate(id, updateUserDto,{new: true})
    return updateUser
  }

  async remove(id) {
    const user = await this.userModel.findById(id)
    if (!user) throw new  NotFoundException
    const deleteUser = await this.userModel.findByIdAndDelete(id)
    return deleteUser;
  }
  async addPost(userId, postId){
    const user = await this.userModel.findById(userId)
    if (!user) throw new  NotFoundException
    user.posts.push(postId)
    const updateUser = await this.userModel.findByIdAndUpdate(userId, user,{new: true})
    return updateUser
  }
}
