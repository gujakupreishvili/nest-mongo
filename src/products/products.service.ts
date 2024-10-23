import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/products.schema';
import { Model } from 'mongoose';
import {faker} from "@faker-js/faker"
import { QueryParamsDto } from './dto/queryParams.dto';

@Injectable()
export class ProductsService implements OnModuleInit {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>){}

  async onModuleInit() {
    // await this.productModel.deleteMany({}) ვშლით ბაზიდან
    const count =  await this.productModel.countDocuments()
    console.log(count)
    if(count === 0 ){
      const insertData = []
      for(let i = 0; i < 100_000; i++){
        insertData.push({
          name: faker.commerce.productName(),
          price: faker.number.int({min: 1, max: 100}),
          imageUrl: faker.image.avatar(),
          quantity: faker.number.int({min:0, max:20}),
          description: faker.commerce.productDescription()
        })
      }
      await this.productModel.insertMany(insertData)
    }
  }

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  findAll(queryParams: QueryParamsDto) {
    let {page, take} =queryParams
    take = take > 20 ? 20 : take
    return this.productModel.find().skip((page -1 )* take).limit(take);
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
  findprice(queryParams: QueryParamsDto){
    let {page, take} =queryParams
    take = take > 20 ? 20 : take
    return this.productModel.find({price: 50}).skip((page -1 )* take).limit(take)
  }
}
