import { Body, Injectable, NotFoundException, } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Todo } from "./todo.model";



@Injectable()
export class TodoService {
    private todos: Todo[] = [];
    constructor(@InjectModel('Todo') private readonly todoModel: Model<Todo>) {

    }

    async insertTodo(
        @Body('task') task: string,
        @Body('done') done: boolean
    ) {
        const newToDo = new this.todoModel({task, done});
        const result = await newToDo.save();
        console.log(result);
        return result.id as string;
    }
    async getTodo(){
        const todos = await this.todoModel.find().exec();
        return todos.map((todo) => ({
            id: todo.id, 
            task: todo.task, 
            done: todo.done
        }));
    }
    async getSingleTodo(todoID: string) {
        const todo = await this.findTodo(todoID);
        return {todo};
    }

    async updateTodo(
        id: string,
        task: string,
        done: boolean
    ){
        const updatedTodo = await this.findTodo(id);
        updatedTodo.task = task;
        updatedTodo.done = done;
        const isNull: boolean = Object.values(updatedTodo).every(value => {
            if(value === null){
                return true;
            }
            return false;
        })
        console.log(isNull)
        if(isNull) {
            throw new NotFoundException('could not find todo');
        }
        const result = await updatedTodo.save();
        return result;

    }


    async deleteTodo(todoID: string) {
        const result = await this.todoModel.deleteOne({_id: todoID}).exec();
        if (result.acknowledged === false) {
            throw new NotFoundException('Could not find Todo');
        }
    }

    private async findTodo(id: string): Promise<Todo>{
        let todo;
        try{
            todo = await this.todoModel.findById(id);
        } catch (error) {
            throw new NotFoundException('Could not find Todo');
        }
        
        if(!todo) {
            throw new NotFoundException('Could not find Todo');
        }
        return todo;
    }
}