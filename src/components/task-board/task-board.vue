<script setup lang="ts">
import TaskItem from '../task-item/task-item.vue';
import { useTaskStore } from '../../stores/task-storage.ts';

const taskStore = useTaskStore();
</script>

<template>
  <section class="taskboard">
    <div class="taskboard__columns">
      <span class="taskboard__column"></span>
      <span class="taskboard__column taskboard__column_title">Описание</span>
      <span class="taskboard__column taskboard__column_status">Статус</span>
      <span class="taskboard__column taskboard__column_date">Дата</span>
    </div>
    <ul class="task-list">
      <TaskItem
        v-for="task in taskStore.filtredTasks ?? taskStore.tasks"
        :key="task.id"
        :id="task.id"
        :title="task.title"
        :completed="task.completed"
        :date="task.date"
      />
    </ul>
  </section>
</template>
