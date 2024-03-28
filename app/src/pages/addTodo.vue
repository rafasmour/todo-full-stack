<template>
<div>
    <q-input class="input" outlined v-model="task" />
    <q-btn push color="primary" label="Push" @click="onSubmit"/>
</div>


</template>

<script setup lang="ts">
import { Ref, ref } from 'vue' 
const emit = defineEmits(['addTask'])
const task: Ref<string> = ref('');
const onSubmit = () => {
    if( !task.value ){
        alert('task cannot be empty');
        return;
    }
        
    console.log(task.value)
    emit('addTask', task.value)
     
}

</script>
<style scoped>
div{
    display: flex;
    justify-content:flex-start;
}
.input{
    width: 80%;
}
</style>