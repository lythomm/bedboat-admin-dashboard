<script setup>
import { ref, onMounted, reactive } from 'vue';
import Button from '../components/UI-Elements/Button.vue';
import supabase from '../supabase';
import Modal from '../components/UI-Elements/Modal.vue';
import Combobox from '../components/UI-Elements/Combobox.vue';

const users = ref([]);
let currentUser = reactive({
  id: undefined,
  first_name: undefined,
  last_name: undefined,
  email: undefined,
  iban: undefined,
  created_at: undefined,
});
const userModal = ref(null);

async function getUsers() {
  try {
    let { data } = await supabase.from('users').select('*');
    users.value = data;
  } catch (error) {
    console.error(error);
  }
}

function resetCurrentUser() {
  currentUser = {
    id: undefined,
    first_name: undefined,
    last_name: undefined,
    email: undefined,
    iban: undefined,
    created_at: undefined,
  };
}

onMounted(() => {
  getUsers();
});

const tableHeaders = ref([
  {
    value: 'first_name',
    text: 'Prénom',
  },
  {
    value: 'last_name',
    text: 'Nom',
  },
  {
    value: 'email',
    text: 'Email',
  },
  {
    value: 'created_at',
    text: 'Créer le',
  },
  {
    value: 'iban',
    text: 'IBAN',
  },
  {
    value: '',
    text: '',
  },
]);
const sortOrder = ref('asc');

const sortUsers = (property) => {
  users.value.sort((a, b) => {
    if (a[property] < b[property]) return sortOrder.value === 'asc' ? -1 : 1;
    if (a[property] > b[property]) return sortOrder.value === 'asc' ? 1 : -1;
    return 0;
  });
  // Toggle sort order for next click
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
};

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { day: 'numeric', month: 'short', year: 'numeric' };

  // Utilisation de 'fr-FR' pour avoir le format français
  return date.toLocaleDateString('fr-FR', options);
}

async function deleteUser(user) {
  const { error } = await supabase.from('users').delete().eq('id', user.id);

  if (error) {
    console.error(
      "Erreur lors de la suppression de l'utilisateur :",
      error.message,
    );
    return;
  }
  getUsers();

  if (user.id === currentUser.id) {
    userModal.value.setIsOpen(false);
  }
}

function viewUser(user) {
  currentUser = user;
  userModal.value.setIsOpen(true);
}

async function addOrUpdateUser(action) {
  if (action === 'add') {
    const { data, error } = await supabase.from('users').insert([
      {
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
        email: currentUser.email,
        iban: currentUser.iban,
      },
    ]);

    if (error) {
      console.error("Erreur lors de l'ajout de l'utilisateur :", error.message);
    }
  } else {
    const { error } = await supabase
      .from('users')
      .update({
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
        email: currentUser.email,
        iban: currentUser.iban,
      })
      .eq('id', currentUser.id)
      .select();

    if (error) {
      console.error(
        "Erreur lors de la modification de l'utilisateur :",
        error.message,
      );
      return;
    }
  }
  getUsers();
  userModal.value.setIsOpen(false);
}

function updateTableView(user) {
  if (user.first_name === '') {
    getUsers();
  } else {
    users.value = users.value.filter((u) => u.id === user.id);
  }
}
</script>

<template>
  <div>
    <div
      class="mb-4 flex justify-between items-center sticky top-0 card-default"
    >
      <h1>Utilisateurs</h1>
      <div class="flex space-x-4 items-center">
        <div class="flex space-x-2 items-center">
          <Combobox :combo-list="users" @search-user="updateTableView" />
          <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
        </div>
        <font-awesome-icon :icon="['fas', 'filter']" />
        <Button
          text="Nouveau"
          @click="
            resetCurrentUser();
            userModal.setIsOpen(true);
          "
        />
      </div>
    </div>
    <div class="card-default">
      <table class="whitespace-nowrap overflow-x-auto w-full">
        <thead>
          <tr>
            <th
              v-for="header in tableHeaders"
              :key="header"
              class="text-left pr-14 first:pl-2 cursor-pointer"
              @click="sortUsers(header.value)"
            >
              <span class="pr-2">
                {{ header.text }}
              </span>
              <font-awesome-icon v-if="header.text" :icon="['fas', 'sort']" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="hover:bg-blue-50 rounded-xl hover:cursor-pointer group"
            v-for="user in users"
            :key="user.id"
            @click="viewUser(user)"
          >
            <td class="py-2 pl-2">{{ user.first_name }}</td>
            <td>{{ user.last_name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ formatDate(user.created_at) }}</td>
            <td>{{ user.iban }}</td>
            <td class="group-hover:opacity-100 opacity-0 space-x-4 pl-4">
              <font-awesome-icon
                :icon="['fas', 'eye']"
                @click="viewUser(user)"
              />
              <font-awesome-icon
                :icon="['fas', 'trash']"
                color="red"
                @click.stop="deleteUser(user)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Modal ref="userModal">
      <template #dialog-title>
        <div v-if="currentUser.id">Modifier l'utilisateur</div>
        <div v-else>Ajouter un utilisateur</div>
      </template>
      <template #dialog-body>
        <div class="mt-2 grid grid-cols-2 gap-4">
          <div>
            <label
              for="first_name"
              class="block text-sm font-medium text-gray-700"
            >
              Prénom
            </label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              v-model="currentUser.first_name"
            />
          </div>
          <div>
            <label
              for="last_name"
              class="block text-sm font-medium text-gray-700"
            >
              Nom
            </label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              v-model="currentUser.last_name"
            />
          </div>
          <div>
            <label
              for="first_name"
              class="block text-sm font-medium text-gray-700"
            >
              Adresse email
            </label>
            <input
              type="email"
              name="first_name"
              id="first_name"
              v-model="currentUser.email"
            />
          </div>
          <div>
            <label
              for="first_name"
              class="block text-sm font-medium text-gray-700"
            >
              IBAN
            </label>
            <input
              type="text"
              name="iban"
              id="iban"
              v-model="currentUser.iban"
            />
          </div>
        </div>

        <div
          class="mt-4 flex"
          :class="[currentUser.id ? ' justify-between' : 'justify-end']"
        >
          <Button
            v-if="currentUser.id"
            text="Supprimer"
            color="red"
            @click="deleteUser(currentUser)"
          />
          <div class="space-x-2">
            <Button
              text="Annuler"
              @click="userModal.setIsOpen(false)"
              color="none"
            />
            <Button
              :text="currentUser.id ? 'Modifier' : 'Ajouter'"
              @keydown.enter="
                addOrUpdateUser(currentUser.id ? 'update' : 'add')
              "
              @click="addOrUpdateUser(currentUser.id ? 'update' : 'add')"
            />
          </div>
        </div>
      </template>
    </Modal>
  </div>
</template>
