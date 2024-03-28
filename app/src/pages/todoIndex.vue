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
  </q-page>
</template>

<script setup lang="ts">
  import { v4 as uuid } from 'uuid';
  import Task from 'src/types/task';
  import todoObject from './todoObject.vue'
  import { Ref, ref } from 'vue'
  import addTodo from './addTodo.vue'
  import axios from 'axios'
  const tasks: Ref<Task[]> = ref([]);

  for( let i = 0; i< 3; i ++)
  tasks.value.push( { id:uuid(),  title: `hi${i}`, done: false } )
  
  const hi = async () => {
    const res = await axios.get('http://localhost:3000/todo')
    console.log(res) 
  }
  hi()
  const changeDone = ( id: string) => {
    console.log(id)
    var index = tasks.value.findIndex( task => task.id == id);
    console.log(index);
    console.log(tasks.value[index])
    tasks.value[index].done = !tasks.value[index].done
    console.log(task.value[index])
    
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
