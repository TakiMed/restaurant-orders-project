import { Schema } from 'mongoose';
import { CreateCostumer } from './dto/create-costumer';
import { CostumersService } from './costumers.service';
import { Controller, Post, Get, Body,Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Costumer } from './dto/costumer.dto';
import { CreateCostumerDto } from './dto/create-costumer.dto';

@Controller('costumers')
@ApiTags('costumers')
export class CostumersController {
    constructor(
        private readonly costumersService: CostumersService
    ){}

    @Post()
    @ApiOperation({summary: 'Create costumer'})
    @ApiResponse({ status: 200, description: 'Costumer succesfully created.'})
    @ApiResponse({ status: 400, description: 'Bad request'})
    @ApiResponse({ status: 404, description: 'Not found'})
    async create (@Body() body:CreateCostumer): Promise<Costumer> {
        const costumerObject = await this.costumersService.create(new CreateCostumerDto(body));
        return new Costumer(costumerObject);
    }

    @Get('all')
    @ApiOperation({summary: 'Retrieve all costumer'})
    @ApiResponse({ status: 200, description: 'Costumers succesfully retrieved.'})
    @ApiResponse({ status: 400, description: 'Bad request'})
    @ApiResponse({ status: 404, description: 'Not found'})
    async findAll(): Promise<Costumer[]>{
        const costumersObject = await this.costumersService.findAll();
        return costumersObject.map((obj) => new Costumer(obj));
    }

    @Get(':id')
    @ApiOperation({summary: 'Retrieve costumer by id'})
    @ApiResponse({ status: 200, description: 'Costumer succesfully retrieved.'})
    @ApiResponse({ status: 400, description: 'Bad request'})
    @ApiResponse({ status: 404, description: 'Not found'})
    async findById(@Param('id') id: string): Promise<Costumer>{
        const costumerObject = await this.costumersService.findById(id);
        return new Costumer(costumerObject);
    }
}
