import { DateFilter } from "../enums/date-filer.enum";
import { IsIn } from "class-validator";
import { ApiParam } from "@nestjs/swagger";

export class FilterDateDto{

    @IsIn([DateFilter.TODAY, DateFilter.MONTH])
    dateOption: DateFilter
}