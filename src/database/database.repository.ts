import { Injectable, NotFoundException } from "@nestjs/common";
import { Model, Schema } from 'mongoose';

@Injectable()
export class DatabaseRepository{

    async create<T>(createDto: any, model: Model<T & Document>, populatedFields: any[] = []): Promise<T>{
        const createdObject = new model(createDto);
        const savedObject = await createdObject.save();
        populatedFields.forEach((field) => savedObject.populate(field));
        return savedObject.execPopulate();
    }

    async findAll<T>(model: Model<T & Document>, pageSize: number = 10, pageNum: number = 0, populateFields: any[] = [] ): Promise<T[]>{
        const found = await model.find().skip(pageNum*pageSize).limit(pageSize);
        populateFields.forEach((field) => found.populate(field));
        return found;
    }
    
    async findById<T>(id: Schema.Types.ObjectId,  model: Model<T & Document>, populateFields: any[] = []): Promise<T>{
        const found = await model.findOne({_id: id});
        if(!found){ throw new NotFoundException(`object with id ${id} not found`);}
        populateFields.forEach((field) => found.populate(field));
        return found;
    }

    async findByQuery<T>(
        query:any,
        model: Model<T & Document>,
        populatedFields: any[] = []
        ): Promise<T[] | null>{
            const found = model.find(query);
            populatedFields.forEach((field) => found.populate(field));
            return await found;
        }

    async update<T>(id: Schema.Types.ObjectId ,updateDto: any, model: Model<T & Document>): Promise<T>{
        const foundObj = await this.findById(id, model);
        if(!foundObj){ throw new NotFoundException(`Object with this id ${updateDto._id} not found`)}

        Object.keys(updateDto).forEach((key) =>{
            if(updateDto[key] === undefined) { delete updateDto[key]; }
        });
        const upadated = await model.findByIdAndUpdate(
            updateDto._id,
            { $set: updateDto},
            { new: true}
        );
        return upadated;
    }

    async delete<T>(id: Schema.Types.ObjectId, model: Model<T & Document>): Promise<T>{
        const deleted = await model.findByIdAndDelete(id);
        if(!deleted){ throw new NotFoundException(`Object with this id ${deleted._id} not found`);}
        return deleted;
    }

}