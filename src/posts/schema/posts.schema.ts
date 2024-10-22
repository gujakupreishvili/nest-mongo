import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class  Posts{
  @Prop()
   title: string
   @Prop()
   content: string
   @Prop({
     type: mongoose.Schema.Types.ObjectId,
     ref: "User"
   }
   )
   user: mongoose.Schema.Types.ObjectId
}

export const PostSchema = SchemaFactory.createForClass(Posts)