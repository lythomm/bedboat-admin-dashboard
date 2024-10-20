<script setup>
import { ref, computed, watch } from 'vue';
import LocomotiveScroll from 'locomotive-scroll';
import Sidebar from './components/Sidebar.vue';

const isSidebarOpen = ref(true);
const user = JSON.parse(localStorage.getItem('user'));

function handleSideBar(value) {
  isSidebarOpen.value = value;
}

const widthToRemove = computed(() => {
  return isSidebarOpen.value ? 12 : 6;
});
</script>

<template>
  <div class="flex">
    <Sidebar v-if="user" @sidebar-status="handleSideBar" />
    <router-view
      class="m-4 relative"
      :class="[isSidebarOpen && user ? 'left-40' : 'left-16']"
      :style="{ width: `calc(100% - ${widthToRemove}rem)` }"
    />
  </div>
</template>
