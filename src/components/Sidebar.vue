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
  { name: 'Annonces', path: '/boats', icon: 'ship' },
  { name: 'Articles', path: '/articles', icon: 'newspaper' },
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
    class="p-4 h-full fixed top-0 whitespace-nowrap border-r shadow-lg bg-white"
    :class="{ 'w-48': sidebarOpen, 'w-16': !sidebarOpen }"
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
    <div class="mb-3" v-for="link in viewsLinks" :key="link.name">
      <router-link
        class="space-x-3 px-2 py-1 transition-default hover:bg-blue-100 rounded-md block"
        :to="link.path"
      >
        <font-awesome-icon class="w-4" :icon="['fas', link.icon]" />
        <span v-if="sidebarOpen" w-full>{{ link.name }}</span>
      </router-link>
    </div>
    <div
      class="transition-default rounded-md absolute bottom-4 left-1/2 -translate-x-1/2"
    >
      <Button
        v-if="sidebarOpen"
        text="Déconnexion"
        color="none"
        @click="logout"
      />
      <div v-else class="p-2">
        <font-awesome-icon
          class="w-4 cursor-pointer"
          :icon="['fas', 'right-from-bracket']"
          @click="logout"
        />
      </div>
    </div>
  </div>
</template>
