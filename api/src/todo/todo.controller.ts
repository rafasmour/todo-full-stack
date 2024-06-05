import { Body, Controller, Get, Post, Param, Patch, Delete} from "@nestjs/common";
import { TodoService } from "./todo.service";






@Controller('api/todo')
export class TodoController {
    constructor(private readonly todoService: TodoService){
    }

    @Post()
    async addTodo(
        @Body('task') task: string,
        @Body('done') done: boolean
    ){
        const result = await this.todoService.insertTodo(task, done);
        return result;
    }
    @Get()
    getAllTodos() {
        return this.todoService.getTodo();
    }
    @Get(':todoID')
    getSingleTodo(@Param('todoID') todoID: string) {
        return this.todoService.getSingleTodo(todoID);
    }
    @Patch(':todoID')
    async updateTodo(
        @Param('todoID') todoID: string,
        @Body('task') task: string,
        @Body('done') done: boolean
    ) {
        await this.todoService.updateTodo(
            todoID,
            task,
            done
        )
        return null;
    }
    @Delete(':todoID')
    async removeTodo(@Param('todoID') todoID: string) {
        await this.todoService.deleteTodo(todoID);
    }

}