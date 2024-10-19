<script setup lang="ts">

const emit = defineEmits(['saveTasks'])

const onSave = () => {
    emit('saveTasks')
}

</script>

<template>

<q-btn color="primary" label="Save" @click="onSave"/>
</template>