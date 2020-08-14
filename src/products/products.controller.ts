import { ProductCategory } from './enums/product.category.enum';
import { Schema } from 'mongoose';
import { Product } from './dto/product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProduct} from './dto/create-product'
import { ProductsService } from './products.service';
import { Controller, Post, Body, Param, Get, Put, Delete, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { FilterByCategoryDto } from './dto/find-product.dto';

@Controller('products')
@ApiTags('products')
export class ProductsController {
    constructor (
        private readonly productService: ProductsService
    ){}

    @Post()
    @ApiOperation({summary: 'Create new product'})
    @ApiResponse({ status: 200, description: 'Product succesfully created.'})
    @ApiResponse({ status: 400, description: 'Bad request'})
    @ApiResponse({ status: 404, description: 'Not found'})
    async create (@Body() body:CreateProduct): Promise<Product> {
        const productObject = await this.productService.create(new CreateProductDto(body));
        return new Product(productObject);
    }

    @Get('all')
    @ApiOperation({summary: 'Retrieve all products'})
    @ApiResponse({ status: 200, description: 'Products succesfully retrieved.'})
    @ApiResponse({ status: 400, description: 'Bad request'})
    @ApiResponse({ status: 404, description: 'Not found'})
    async findAll(): Promise<Product[]>{
        const productObjects = await this.productService.findAll();
        return productObjects.map((obj) => new Product(obj));
    }

    @Get('categoryfilter')
    @ApiOperation({summary: 'Retrieve products by order category'})
    @ApiQuery({ name: 'category', enum: ProductCategory })
    @ApiResponse({ status: 200, description: 'Products succesfully retrieved.'})
    @ApiResponse({ status: 400, description: 'Bad request'})
    @ApiResponse({ status: 404, description: 'Not found'})
    async filter(@Query() filterDto: FilterByCategoryDto): Promise<Product[] | null> {
        const foundObj = await this.productService.findByCategory(filterDto);
        return foundObj.map((obj) => new Product(obj));
    }

    @Get(':id')
    @ApiOperation({summary: 'Retrieve product by id'})
    @ApiResponse({ status: 200, description: 'Product succesfully retrieved.'})
    @ApiResponse({ status: 400, description: 'Bad request'})
    @ApiResponse({ status: 404, description: 'Not found'})
    async findById(@Param('id') id: Schema.Types.ObjectId): Promise<Product>{
        const productObject = await this.productService.findById(id);
        return new Product(productObject);
    }

    @Get(':title')
    @ApiOperation({summary: 'Retrieve product by title'})
    @ApiResponse({ status: 200, description: 'Product succesfully retrieved.'})
    @ApiResponse({ status: 400, description: 'Bad request'})
    @ApiResponse({ status: 404, description: 'Not found'})
    async findByTitle(@Param('title') title: string): Promise<Product[]>{
        const productsObject = await this.productService.findByTitle(title);
        return productsObject.map((obj) => new Product(obj));
    }


    @Delete(':id')
    @ApiOperation({summary: 'Delete product'})
    @ApiResponse({ status: 200, description: 'Product succesfully deleted.'})
    @ApiResponse({ status: 400, description: 'Bad request'})
    @ApiResponse({ status: 404, description: 'Not found'})
    async delete(@Param('id') id: Schema.Types.ObjectId): Promise<Product>{
        const productObject = await this.productService.delete(id);
        return new Product(productObject);
    }
}
