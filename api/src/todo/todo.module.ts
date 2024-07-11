import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { todoSchema } from "./todo.model";
import { TodoController } from "./todo.controller";
import { TodoService } from "./todo.service";

@Module({
    imports: [MongooseModule.forFeature([{name: 'Todo', schema: todoSchema}])],
    controllers: [TodoController],
    providers: [TodoService],
})
export class TodoModule{}