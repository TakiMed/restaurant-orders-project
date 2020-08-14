import { Schema } from 'mongoose';
import { FilterOrderDto } from './dto/filter-order-dto';
import { OrderStatus } from './enums/order-status.enum';
import { OrdersService } from './orders.service';
import { Controller, Post, Body, Get, Query, Param, Put, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateOrder } from './dto/create-order';
import { Order } from './dto/order.dto'
import { DateFilter } from './enums/date-filer.enum';
import { PaginationDto } from './dto/pagination.dto';

@Controller('orders')
@ApiTags('orders')
export class OrdersController {
    
    constructor(
        private readonly ordersService: OrdersService
    ){}

    @Post()
    @ApiOperation({summary: 'Create order'})
    @ApiResponse({ status: 200, description: 'Order succesfully created.'})
    @ApiResponse({ status: 400, description: 'Bad request'})
    @ApiResponse({ status: 404, description: 'Not found'})
    async create(@Body() body: CreateOrder): Promise<Order>{
        const order = await this.ordersService.create(body);
        return new Order(order);
    }

    @Get('all')
    @ApiQuery({ name: 'pagesize', required: false, type: Number })
    @ApiQuery({ name: 'pagenum', required: false, type: Number })
    @ApiOperation({summary:'Retrieve all orders'})
    @ApiResponse({ status: 200, description: 'Orders succesfully retrieved.'})
    @ApiResponse({ status: 400, description: 'Bad request'})
    @ApiResponse({ status: 404, description: 'Not found'})
    async findAll( @Query() paginationDto: PaginationDto): Promise<Order[]>{
        console.log(paginationDto);
        const ordersObj = await this.ordersService.findAll(paginationDto);
        return ordersObj.map((obj) => new Order(obj));
    }

    @Get('search')
    @ApiQuery({ name: '_id', required: false, type: String })
    @ApiQuery({ name: 'status', required: false, enum: OrderStatus })
    @ApiQuery({ name: 'dateCreated', required: false, type: Date })
    @ApiQuery({ name: 'totalAmount', required: false, type: Number })
    @ApiResponse({ status: 200, description: 'Orders succesfully retrieved.'})
    @ApiResponse({ status: 400, description: 'Bad request'})
    @ApiResponse({ status: 404, description: 'Not found'})
    @ApiOperation({summary: 'Search by id, status, totalAmount or dateCreated'})
    async search(@Query() filterDto: FilterOrderDto): Promise<Order[] | null>{
        const foundObj  = await this.ordersService.findByQuery(filterDto);
        return foundObj.map((obj) => new Order(obj));
    }

    @Get('filterbydate/:date')
    @ApiResponse({ status: 200, description: 'Orders succesfully retrieved.'})
    @ApiResponse({ status: 400, description: 'Bad request'})
    @ApiResponse({ status: 404, description: 'Not found'})
    async filter(@Param('date') date: DateFilter){
        return this.ordersService.dateFilter(date);
    }

    @Get('/chosenproducts/:id')
    @ApiOperation({ summary: 'View Chosen'})
    @ApiResponse({ status: 200, description: 'Orders succesfully retrieved.'})
    @ApiResponse({ status: 400, description: 'Bad request'})
    @ApiResponse({ status: 404, description: 'Not found'})
    async viewChosen(@Param('id') id: string){
        // return this.ordersService.viewChosen(id);
    }


    @Put(':id')
    @ApiOperation({ summary: 'Edit order'})
    @ApiResponse({ status: 200, description: 'Orders succesfully retrieved.'})
    @ApiResponse({ status: 400, description: 'Bad request'})
    @ApiResponse({ status: 404, description: 'Not found'})
    async update(@Param('id') id: string, @Body() body: CreateOrder): Promise<Order>{
        const orderObj =  await this.ordersService.update(id, body);
        return new Order(orderObj);
    }

    @Patch(':id/addproducts/:prodid')
    @ApiOperation({ summary: 'Add product to order'})
    @ApiResponse({ status: 200, description: 'Products succesfully added to order.'})
    @ApiResponse({ status: 400, description: 'Bad request'})
    @ApiResponse({ status: 404, description: 'Not found'})
    async addProducts(@Param('id') id: Schema.Types.ObjectId, @Param('prodid') prodId: Schema.Types.ObjectId): Promise<Order>{
        const orderObj = await this.ordersService.addProducts(id, prodId);
        return new Order(orderObj);
    }

    @Patch(':id/rmproducts/:prodid')
    @ApiOperation({ summary: 'Remove products from order'})
    @ApiResponse({ status: 200, description: 'Products succesfully added to order.'})
    @ApiResponse({ status: 400, description: 'Bad request'})
    @ApiResponse({ status: 404, description: 'Not found'})
    async removeProducts(@Param('id') id: string, @Param('prodid') prodId: string): Promise<Order>{
        const orderObj = await this.ordersService.removeProducts(id, prodId);
        return new Order(orderObj);
    }

    @Patch(':id/changepaybool/payed')
    @ApiOperation({ summary: 'Evident as payed'})
    @ApiResponse({ status: 200, description: 'Payment done'})
    @ApiResponse({ status: 400, description: 'Bad request'})
    @ApiResponse({ status: 404, description: 'Not found'})
    async payed( @Param('id') id: string){
        return this.ordersService.changePaymentStatus(id, true);
    }

    @Patch(':id/changepaybool/debt')
    @ApiOperation({ summary: 'Evident as a debt'})
    @ApiResponse({ status: 200, description: 'Payment done'})
    @ApiResponse({ status: 400, description: 'Bad request'})
    @ApiResponse({ status: 404, description: 'Not found'})
    async debt(@Param('id') id: string){
        return this.ordersService.changePaymentStatus(id, false);
    }

    @Delete(':id')
    @ApiOperation({summary: 'Delete order'})
    @ApiResponse({ status: 200, description: 'Product succesfully deleted.'})
    @ApiResponse({ status: 400, description: 'Bad request'})
    @ApiResponse({ status: 404, description: 'Not found'})
    async delete(@Param('id') id: Schema.Types.ObjectId): Promise<Order>{
        const orderObject = await this.ordersService.delete(id);
        return new Order(orderObject);
    }

}
