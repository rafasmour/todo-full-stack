import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { todoSchema } from "./todo.model";
import { TodoController } from "./todo.controller";
import { TodoService } from "./todo.service";


@Module({
    imports: [MongooseModule.forFeature([{name: 'todo', schema: todoSchema}])],
    controllers: [TodoController],
    providers: [TodoService],
    exports: [TodoService]
})
export class TodoModule{
    
}
