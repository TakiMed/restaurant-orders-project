import { IsString, Length } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateCostumer{
    @IsString()
    @Length(3,15)
    @ApiProperty({ type: String , description: 'Enter your name'})
    name: string;

    @IsString()
    @Length(3,15)
    @ApiProperty({ type: String , description: 'Enter your surname'})
    surname: string;
}