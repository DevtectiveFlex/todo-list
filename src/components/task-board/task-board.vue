<script setup lang="ts">
import TaskItem from '../task-item/task-item.vue';
import { useTaskStore } from '../../stores/task-storage.ts';

const taskStore = useTaskStore();
</script>

<template>
  <section class="taskboard">
    <div class="taskboard__columns">
      <span class="taskboard__column" aria-hidden="true"></span>
      <span class="taskboard__column taskboard__column_title" aria-label="Колонка 'Описание задачи'">Описание</span>
      <span class="taskboard__column taskboard__column_status" aria-label="Колонка 'Статус задачи'">Статус</span>
      <span class="taskboard__column taskboard__column_date" aria-label="Колонка 'Дата'">Дата</span>
    </div>
    <ul class="task-list">
      <TaskItem
        v-for="task in taskStore.visibleTasks"
        :key="task.id"
        v-bind="task"
      />
      <li v-if="!taskStore.visibleTasks.length">
        Кажется, здесь должны были быть задачи...
      </li>
    </ul>
  </section>
</template>
