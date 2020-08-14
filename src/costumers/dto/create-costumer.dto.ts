import { CreateCostumer } from './create-costumer';

export class CreateCostumerDto{
    name: string;
    surname: string;

    constructor(createCostumer: CreateCostumer){
        this.name = createCostumer.name;
        this.surname = createCostumer.surname;
    }
}