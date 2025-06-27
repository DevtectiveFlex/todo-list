<script setup lang="ts">
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast();
const props = defineProps<{
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: string) => void;
}>();

const inputValue = ref('');

function handleSubmit() {
  if (!inputValue.value.trim()) {
    toast.clear();
    toast.warning('Поле описания пустое')
    return;
  }
  props.onSubmit(inputValue.value.trim());
  inputValue.value = '';
}

function handleClose() {
  inputValue.value = '';
  props.onClose();
}
</script>

<template>
  <Teleport to="body">
    <form class="popup" v-if="props.visible" @submit.prevent="handleSubmit">
      <div class="popup__wrapper">
        <div class="popup__content">
          <h3 class="popup__title">
            Создать новую задачу
            <button
              class="button popup__close-button"
              type="button"
              @click="handleClose"
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
