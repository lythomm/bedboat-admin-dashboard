<script setup>
import { ref, computed } from 'vue';
import LocomotiveScroll from 'locomotive-scroll';
import Sidebar from './components/Sidebar.vue';

const isSidebarOpen = ref(true);

const locomotiveScroll = new LocomotiveScroll();

function handleSideBar(value) {
  isSidebarOpen.value = value;
}

const widthToRemove = computed(() => {
  return isSidebarOpen.value ? 12 : 6;
});
</script>

<template>
  <div class="flex">
    <Sidebar @sidebar-status="handleSideBar" />
    <router-view
      class="m-4 relative"
      :class="[isSidebarOpen ? 'left-40' : 'left-16']"
      :style="{ width: `calc(100% - ${widthToRemove}rem)` }"
    />
  </div>
</template>
