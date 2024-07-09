<template>
    <q-page class="q-pa-lg bg-grey-3 ">
      <h5>Todo</h5>
      <addTodo @addTask="addTask"></addTodo>
      <q-list 
        class="bg-gray"
        v-for="task in tasks"
          :key="task.title"
          tag="label" 
        bordered
        seperator
      >
          <todoObject
          :task="task"
          @changeDone="changeDone"
          @deleteTask="deleteTask"
          />

        
          
        
      </q-list>
      <TodoSave @saveTasks="saveTasks"/>
    </q-page>
</template>

<script setup lang="ts">
  import { v4 as uuid } from 'uuid';
  import { Task } from '../types/task'
  import todoObject from './todoObject.vue'
  import { Ref, ref } from 'vue'
  import addTodo from './addTodo.vue'
  import axios from 'axios'
import TodoSave from './todoSave.vue';
  const tasks: Ref<Task[]> = ref([]);

  
  const hi = async () => {
    const res = await axios.get('http://172.26.0.2:3000/api/todo')
    .then(
      res => { console.log(res); return res; }
    )
    .catch(
      err => { console.log(err); return err; }
    );

    for ( let i = 0; i < res.data.length; i ++ )
        tasks.value.push( 
          {
            id: res.data[i].id,
            title: res.data[i].task,
            done: res.data[i].done
          }
        )
  }
  hi()
  const changeDone = ( id: string) => {
    console.log(id)
    var index = tasks.value.findIndex( task => task.id == id);
    console.log(index);
    console.log(tasks.value[index])
    tasks.value[index].done = !tasks.value[index].done
    console.log(tasks.value[index])
    
  }
  const deleteTask = ( id: string ) => {
    var index = tasks.value.findIndex( task => task.id == id);
    tasks.value.splice(index, 1)
  }
  const addTask = ( title: string ) => {
    tasks.value.push({
      id: uuid(),
      title: title,
      done: false
    })
  }
  const saveTasks = async () => {
    await axios.delete('http://172.26.0.2:3000/api/todo')
    .then(
      res => { console.log(res); return res; }
    )
    .catch(
      err => { console.log(err); return err; }
    );
    for( let i = 0; i < tasks.value.length; i++)
      axios.post('http://172.26.0.2:3000/api/todo', 
        {
          task: tasks.value[i].title,
          done: tasks.value[i].done
        }
      )
      .then(
        res => { console.log(res); return res; }
      )
      .catch(
      err => { console.log(err); return err; }
      );
  }
</script>

<style>
  .todo-item{
    margin-bottom: .5em;
  }
  .done{
    .q-item_label{
      text-decoration: line-through;
    }
  }
</style>
