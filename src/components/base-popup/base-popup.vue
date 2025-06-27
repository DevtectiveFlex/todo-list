<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps<{
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: string) => void;
}>();

const inputValue = ref('');

function handleSubmit() {
  if (!inputValue.value.trim()) {
    return;
  }
  props.onSubmit(inputValue.value.trim());
  inputValue.value = '';
}
</script>

<template>
  <Teleport to="body">
    <form class="popup" v-if="visible" @submit.prevent="handleSubmit">
      <div class="popup__wrapper">
        <div class="popup__content">
          <h3 class="popup__title">
            Создать новую задачу
            <button
              class="button popup__close-button"
              type="button"
              @click="onClose"
            >
              ✕
            </button>
          </h3>

          <label class="popup__input-label">
            Описание
            <input
              class="popup__input"
              type="text"
              placeholder="Введите описание"
              v-model="inputValue"
            />
          </label>

          <button class="button popup__create-button" type="submit">
            Создать
          </button>
        </div>
      </div>
    </form>
  </Teleport>
</template>
