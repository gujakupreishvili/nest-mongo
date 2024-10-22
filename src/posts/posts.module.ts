import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Posts, PostSchema } from './schema/posts.schema';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[
    MongooseModule.forFeature([{name: Posts.name, schema:PostSchema}]),
    UserModule
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
