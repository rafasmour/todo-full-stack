import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { MongooseModule } from '@nestjs/mongoose';
const uri = `${process.env.DATABASE_URL}`
@Module({
  imports: [
    TodoModule, 
    MongooseModule.forRoot(
      process.env.DATABASE_URI
    )
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
