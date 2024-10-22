import { UserService } from './../user/user.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Posts } from './schema/posts.schema';
import { Model } from 'mongoose';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Posts.name) private postModel: Model<Posts>,
  private UserService: UserService

){}
  async create(createPostDto: CreatePostDto, user: string) {
    const newPost= await this.postModel.create({...createPostDto, user});
    await this.UserService.addPost(user, newPost._id)
    return newPost
  }

  findAll() {
    return this.postModel.find();
  }

  findOne(id) {
    return this.postModel.findById(id).populate('user' ,'email');
  }

  async update(id, updatePostDto: UpdatePostDto) {
    const  posts= await this.postModel.findById(id)
    if (!posts)  throw new NotFoundException
    const updatePosts = await this.postModel.findByIdAndUpdate(id, updatePostDto, {new: true})
    return updatePosts;
  }

  async remove(id) {
    const  posts= await this.postModel.findById(id)
    if (!posts)  throw new NotFoundException
    const deletePosts = await this.postModel.findByIdAndUpdate(id)
    return deletePosts;
  }
}
