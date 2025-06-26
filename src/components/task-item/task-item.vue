<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Task } from '../../types/tasks.ts';
import { useTaskStore } from '../../stores/task-storage.ts'

const taskStore = useTaskStore();
const props = withDefaults(defineProps<Task>(), {
  id: crypto.randomUUID(),
  completed: false,
  date: new Intl.DateTimeFormat('ru-RU').format(Date.now()),
});
const isCompleted = ref(props.completed ?? false);

watch(isCompleted, (newStatus: boolean) => {
  const currentTask = taskStore.tasks.find((task) => task.id === props.id);
  if (currentTask) {
    currentTask.completed = newStatus;
  }
})
</script>

<template>
  <li class="task" :id="`task-${props.id}`">
    <label 
      class="task__checkbox-label" 
      :class="{'task__checkbox-label_checked' : isCompleted}"
    >
      <input class="task__checkbox" type="checkbox" v-model="isCompleted" >
    </label>
    <span class="task__title">{{ title }} </span>
    <span 
      class="task__status task__status_pending"
      :class="{task__status_completed : isCompleted}"
    >
      {{ isCompleted ? 'Выполнено' : 'В работе' }} 
    </span>
    <span class="task__date"> {{ date }} </span>
  </li>
</template>