<script setup>
defineProps({
  text: {
    type: String,
    default: undefined,
  },
  color: {
    type: String,
    default: 'blue',
  },
});
</script>

<template>
  <button
    type="button"
    class="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
    :class="[
      color === 'blue' ? 'bg-blue-100 text-blue-900 hover:bg-blue-200' : '',
      color === 'red' ? 'bg-red-100 text-red-900 hover:bg-red-200' : '',
      color === 'none' ? 'bg-white text-gray-900 hover:bg-gray-100' : '',
    ]"
  >
    {{ text }}
  </button>
</template>
