<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Button from '../components/UI-Elements/Button.vue';
import supabase from '../supabase';

const emit = defineEmits(['sidebarStatus']);

const router = useRouter();
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

async function logout() {
  let { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
  } else {
    router.push('/login');
    window.location.reload();
    localStorage.clear();
  }
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
      <router-link
        class="space-x-3 p-2 transition-default hover:bg-blue-100 rounded-md"
        :to="link.path"
      >
        <font-awesome-icon class="w-4" :icon="['fas', link.icon]" />
        <span v-if="sidebarOpen">{{ link.name }}</span>
      </router-link>
    </div>
    <Button text="Déconnexion" color="none" @click="logout" />
  </div>
</template>
