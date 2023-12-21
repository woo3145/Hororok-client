<template>
  <Header />
  <div class="pt-16">
    <component :is="currentView" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Home from './pages/Home.vue';
import About from './pages/About.vue';
import NotFound from './pages/NotFound.vue';
import Login from './pages/Login.vue';
import Header from '@/components/Header.vue';
import Register from './pages/Register.vue';

const routes: { [key: string]: any } = {
  '/': Home,
  '/about': About,
  '/login': Login,
  '/register': Register,
};

const currentPath = ref(window.location.hash);

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash;
});

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound;
});
</script>
