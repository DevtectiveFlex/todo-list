import { ref, watch } from 'vue'
import { defineStore } from "pinia";
import type { Task } from '../types/tasks.ts';

const TASK_STORAGE = 'tasks';

export const useTaskStore = defineStore(
  TASK_STORAGE,
  () => {
    const tasks = ref<Task[]>([])

    watch(tasks, (updatedTasks:Task[]) => {
      sessionStorage.setItem(TASK_STORAGE, JSON.stringify(updatedTasks));
    }, { deep: true});

    const stored = sessionStorage.getItem(TASK_STORAGE);
    if (stored) {
      tasks.value = JSON.parse(stored);
    }

    function addTask(task: Task) {
      tasks.value.push(task);
    }

    return {
      tasks,
      addTask,
    }
});

