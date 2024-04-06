import * as mongoose from 'mongoose';

export const todoSchema = new mongoose.Schema({
    task: String,
    done: Boolean,
})


export interface Todo extends mongoose.Document {
        id: number;
        task: string;
        done: boolean;    
}