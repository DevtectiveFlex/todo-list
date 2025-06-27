<script setup lang="ts">
import { ref } from 'vue';
import { useTaskStore } from '../../stores/task-storage.ts';
import BasePopup from '../base-popup/base-popup.vue';

const isPopupShowed = ref(false);

function openPopup() {
  isPopupShowed.value = true;
}

function closePopup() {
  isPopupShowed.value = false;
}
const taskStore = useTaskStore();
function onAddTaskClick(title: string) {
  if (title && typeof title === 'string') {
    taskStore.addTask({
      id: crypto.randomUUID(),
      title,
      completed: false,
      date: new Intl.DateTimeFormat('ru-RU').format(Date.now()),
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
      @click="openPopup"
    ></button>
  </header>
  <BasePopup
    :visible="isPopupShowed"
    :onClose="closePopup"
    :onSubmit="onAddTaskClick"
  />
</template>
