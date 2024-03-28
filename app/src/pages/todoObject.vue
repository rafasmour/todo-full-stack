<template>
    <q-item
      class="bg-gray"
      v-ripple
      bordered
        >
        <q-item-section>
          <q-checkbox 
          
          :model-value="taskData.done"
          @click="emit('changeDone', taskData.id)"
          >
          
        </q-checkbox>
        </q-item-section>
        <q-item-section>
          <q-item-label> {{ taskData.title }} </q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label @click="emit('deleteTask', taskData.id)"> <o class="fa fa-trash"></o></q-item-label>
        </q-item-section>
      </q-item>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  task: {
    type: Object,
    required: true,
  }
})

const taskData = props.task;
const emit = defineEmits(['changeDone'])
</script>