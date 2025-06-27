import { ref, watch } from 'vue';
import { defineStore } from 'pinia';
import type { Task } from '../types/tasks.ts';
import { parseDate } from '../utils/data-parser.ts';
import { dateGenerator } from '../utils/date-generator.ts';

const TASK_STORAGE = 'tasks';

export const useTaskStore = defineStore(TASK_STORAGE, () => {
  const tasks = ref<Task[]>([]);
  const filtredTasks = ref<Task[] | null>(null);

  watch(
    tasks,
    (updatedTasks: Task[]) => {
      sessionStorage.setItem(TASK_STORAGE, JSON.stringify(updatedTasks));
    },
    { deep: true },
  );

  const stored = sessionStorage.getItem(TASK_STORAGE);
  if (stored) {
    tasks.value = JSON.parse(stored);
  }

  function addTask(task: Task) {
    if (task.title == 'old') {
      task.date = dateGenerator();
    }
    tasks.value.push(task);
  }

  function sortTasksByDate() {
    tasks.value = tasks.value.sort((a, b) => {
      if (a.date && b.date) {
        return parseDate(a.date) - parseDate(b.date);
      }
      return 0;
    });
  }

  function sortTasksByStatus() {
    tasks.value = tasks.value.sort((a, b) => {
      return Number(a.completed) - Number(b.completed);
    });
  }

  function searchTasks(query: string): void {
    const trimmedQuery = query.toLowerCase().trim();
    filtredTasks.value = tasks.value.filter((task) => {
      const titleMatch = task.title.toLowerCase().trim().includes(trimmedQuery);
      const dateMatch = task.date?.includes(trimmedQuery);
      const statusMatch =
        (task.completed && trimmedQuery === 'выполнено') ||
        (!task.completed && trimmedQuery === 'в работе');
      return titleMatch || dateMatch || statusMatch;
    });
  }

  function resetSearch() {
    filtredTasks.value = null;
  }

  return {
    tasks,
    filtredTasks,
    addTask,
    sortTasksByDate,
    sortTasksByStatus,
    searchTasks,
    resetSearch,
  };
});
