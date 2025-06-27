<script setup lang="ts">
import { ref, watch } from 'vue';
import { useToast } from 'vue-toastification';
import type { sortValue } from '../../types/sort-types';
import { useTaskStore } from '../../stores/task-storage.ts';

const SEARCH_PLACEHOLDER = 'Поиск Имени, статуса или даты';
const SORT_OPTIONS: sortValue[] = [
  {
    value: 'date',
    description: 'Дата',
  },
  {
    value: 'status',
    description: 'Статус',
  },
];

const taskStore = useTaskStore();

function startSort(sortMethod?: string | null) {
  const currentMethod = sortMethod ?? sortBy.value;

  if (!currentMethod) return;

  switch (sortMethod) {
    case 'date':
      taskStore.sortTasksByDate();
      break;
    case 'status':
      taskStore.sortTasksByStatus();
      break;
    default:
      toast.error('Не удалось установить метод сортировки');
  }
}
const sortBy = ref<string | null>(null);
watch(sortBy, startSort);

const search = ref('');
watch(search, (value) => {
  if (!value.trim()) {
    taskStore.resetSearch();
  }
});
const toast = useToast();
const toastMessage = ref('');
function onSearchClick(): void {
  const searchQuery = search.value.trim();
  if (!searchQuery) {
    toast.clear();
    toastMessage.value = 'Поле поиска пустое';
    toast.warning(toastMessage.value);
    search.value = '';
    setTimeout(() => {
      toastMessage.value = '';
    }, 3000);
    return;
  }
  taskStore.searchTasks(searchQuery);
  startSort();
}
</script>

<template>
  <form class="search-form" @submit.prevent="onSearchClick">
    <button type="submit" class="search-form__button" aria-label="Начать поиск">
      <img src="../../assets/search-icon.svg" width="18" height="18" />
    </button>
    <input
      type="text"
      v-model="search"
      :placeholder="SEARCH_PLACEHOLDER"
      class="search-form__input"
      aria-label="Поле для ввода искомого значения"
    />
    <button
      type="button"
      class="button"
      v-if="search.trim()"
      @click="search = ''"
      aria-label="Очистить поле поиска"
    >
      ✕
    </button>
    <label class="search-form__sort-label" for="sortType">
      Сортировать по:
      <select class="search-form__sort-select" id="sortType" v-model="sortBy">
        <option
          v-for="option in SORT_OPTIONS"
          :key="option.value"
          :value="option.value"
        >
          {{ option.description }}
        </option>
      </select>
    </label>
  </form>
  <div id="access-toast" class="visually-hidden" aria-live="assertive">
    {{ toastMessage }}
  </div>
</template>
