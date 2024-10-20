<script setup>
import { ref, computed, watch } from 'vue';
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from '@headlessui/vue';

const props = defineProps({
  comboList: {
    required: true,
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['searchUser']);

let people = [{ id: 0, first_name: '', last_name: '' }];

let selected = ref(people[0]);
let query = ref('');

let filteredPeople = computed(() =>
  query.value === ''
    ? people
    : people.filter((person) =>
        `${person.first_name} ${person.last_name} ${person.email}`
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.value.toLowerCase().replace(/\s+/g, '')),
      ),
);

watch(
  () => props.comboList,
  (newValue) => {
    people = [{ id: 0, first_name: '', last_name: '' }];
    people.push(...newValue);
  },
);

watch(
  () => selected.value,
  (newValue) => {
    emit('searchUser', newValue);
  },
);

function removeSelectedUser() {
  selected.value = people[0];
}
</script>

<template>
  <div class="w-72">
    <Combobox v-model="selected">
      <div class="relative mt-1">
        <div
          class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm"
        >
          <ComboboxInput
            class="w-full py-2 pl-3 text-sm text-gray-900 focus:ring-0"
            :displayValue="
              (person) => `${person.first_name} ${person.last_name}`
            "
            @change="query = $event.target.value"
          />
          <font-awesome-icon
            v-if="selected?.id !== 0"
            class="absolute inset-y-0 top-1/2 -translate-y-1/2 right-0 flex items-center pr-2 cursor-pointer"
            :icon="['fas', 'xmark']"
            @click="removeSelectedUser"
          />
        </div>
        <TransitionRoot
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          @after-leave="query = ''"
        >
          <ComboboxOptions
            class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
          >
            <div
              v-if="filteredPeople.length === 0 && query !== ''"
              class="relative cursor-default select-none px-4 py-2 text-gray-700"
            >
              Aucun résultat trouvé.
            </div>

            <ComboboxOption
              v-for="person in filteredPeople"
              :key="person.id"
              :value="person"
              v-slot="{ selected, active }"
            >
              <li
                class="relative cursor-default select-none py-2 pl-10 pr-4"
                :class="{
                  hidden: person.id === 0,
                  'bg-blue-400 text-white': active,
                  'text-gray-900': !active,
                }"
              >
                <span
                  class="block truncate"
                  :class="{ 'font-medium': selected, 'font-normal': !selected }"
                >
                  {{ person.first_name }} {{ person.last_name }}
                </span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3"
                  :class="{ 'text-white': active, 'text-blue-600': !active }"
                >
                  <font-awesome-icon :icon="['fas', 'circle-check']" />
                </span>
              </li>
            </ComboboxOption>
          </ComboboxOptions>
        </TransitionRoot>
      </div>
    </Combobox>
  </div>
</template>
