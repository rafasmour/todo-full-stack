<template>
    <q-page class="q-pa-lg bg-grey-3 ">
      <h5>Todo</h5>
      <addTodo @addTask="addTask"></addTodo>
      <q-list 
        class="bg-gray"
        v-for="task in tasks"
          :key="task.task"
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
  import todoObject from '../components/todoObject.vue'
  import { Ref, ref } from 'vue'
  import addTodo from '../components/addTodo.vue'
  import axios from 'axios'
  import TodoSave from '../components/todoSave.vue';

  const tasks: Ref<Task[]> = ref([]);
  const api = `https://todo.${process.env.DOMAIN}/api`;
  const hi = async () => {
    const res = await axios.get(api)
    .then(
      res => { console.log(res); return res; }
    )
    .catch(
      err => { console.log(err); return err; }
    );
    res.data.forEach( (task: { id: string, task: string, done: boolean}) => {
      tasks.value.push(task)
    })

    // for ( let i = 0; i < res.data.length; i ++ )
    //     tasks.value.push( 
    //       {
    //         id: res.data[i].id,
    //         title: res.data[i].task,
    //         done: res.data[i].done
    //       }
    //     )
  }
  hi()
  const changeDone = ( id: string) => {
    console.log(id)
    var index = tasks.value.findIndex( task => task.id == id);
    tasks.value[index].done = !tasks.value[index].done
    
  }
  const deleteTask = ( id: string ) => {
    var index = tasks.value.findIndex( task => task.id == id);
    tasks.value.splice(index, 1)
  }
  const addTask = ( task: string ) => {
    tasks.value.push({
      id: uuid(),
      task: task,
      done: false
    })
  }
  const saveTasks = async () => {
    await axios.delete(api)
    .then(
      res => { console.log(res); return res; }
    )
    .catch(
      err => { console.log(err); return err; }
    );
    axios.post(api + '/array', 
        tasks.value
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
