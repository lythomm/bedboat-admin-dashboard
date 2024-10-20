<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import supabase from '../supabase';
import Button from '../components/UI-Elements/Button.vue';

const email = ref('');
const password = ref('');
const router = useRouter();

async function handleLogin() {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  if (error) {
    console.error(error);
  } else {
    localStorage.setItem('user', JSON.stringify(data.user));
    router.push('/');
    window.location.reload();
  }
}
</script>

<template>
  <div>
    <div class="flex justify-center mt-24">
      <form class="space-y-4">
        <h1>Connexion</h1>
        <div class="flex flex-col">
          <label for="email">Adresse email</label>
          <input type="email" name="email" id="email" v-model="email" />
        </div>
        <div class="flex flex-col">
          <label for="password">Mot de passe</label>
          <input
            type="password"
            name="password"
            id="password"
            v-model="password"
          />
        </div>
        <div class="text-right">
          <Button text="Se connecter" @click="handleLogin" />
        </div>
      </form>
    </div>
  </div>
</template>
