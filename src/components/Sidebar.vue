<script setup>
import { ref } from 'vue';

const emit = defineEmits(['sidebarStatus']);

const sidebarOpen = ref(true);
const viewsLinks = ref([
  { name: 'Accueil', path: '/', icon: 'house' },
  { name: 'Utilisateurs', path: '/users', icon: 'user' },
  { name: 'Paramètres', path: '/settings', icon: 'gear' },
]);

function handleSidebar() {
  sidebarOpen.value = !sidebarOpen.value;
  emit('sidebarStatus', sidebarOpen.value);
}
</script>

<template>
  <div
    class="p-4 h-full fixed top-0 whitespace-nowrap transition-default border-r shadow-lg bg-white"
  >
    <div class="flex items-center justify-center space-x-2 mb-12">
      <h2 v-if="sidebarOpen">BedBoat</h2>
      <div
        class="transition-default cursor-pointer"
        :class="{ 'rotate-180': sidebarOpen }"
        @click="handleSidebar"
      >
        <font-awesome-icon :icon="['fas', 'chevron-right']" size="xs" />
        <font-awesome-icon :icon="['fas', 'chevron-right']" size="xs" />
      </div>
    </div>
    <div class="mb-4" v-for="link in viewsLinks" :key="link.name">
      <router-link class="space-x-3 p-2 transition-default" :to="link.path">
        <font-awesome-icon class="w-4" :icon="['fas', link.icon]" />
        <span v-if="sidebarOpen">{{ link.name }}</span>
      </router-link>
    </div>
  </div>
</template>
