<script setup lang="ts">
import { ref } from 'vue';
import { useTaskStore } from '../../stores/task-storage.ts';
import BasePopup from '../base-popup/base-popup.vue';
import { dateGenerator } from '../../utils/date-generator.ts';

const taskStore = useTaskStore();

const isPopupVisible = ref(false);

function openPopup() {
  isPopupVisible.value = true;
  document.body.style.overflow = 'hidden';
}

function closePopup() {
  isPopupVisible.value = false;
  document.body.style.overflow = '';
}

function onAddTaskClick(title: string): void {
  if (title && typeof title === 'string') {
    taskStore.addTask({
      id: crypto.randomUUID(),
      title,
      completed: false,
      date: dateGenerator(true),
    });
    closePopup();
    return;
  }
}
</script>

<template>
  <header class="page-header">
    <h2 class="page-header__title">To do list</h2>
    <button
      type="button"
      class="button page-header__button"
      aria-label="Добавить новую задачу"
      @click="openPopup"
    ></button>
  </header>
  <BasePopup
    :visible="isPopupVisible"
    :onClose="closePopup"
    :onSubmit="onAddTaskClick"
  />
</template>
