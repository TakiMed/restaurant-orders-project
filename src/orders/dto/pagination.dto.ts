import { IsNumber, IsIn } from "class-validator";

export class PaginationDto{
    @IsIn([5,10,20,100])
    pagesize: number;

    @IsNumber()
    pagenum: number;
}