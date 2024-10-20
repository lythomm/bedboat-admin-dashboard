import { createStore } from 'vuex';
import { version as versionWebsite } from '../../../package.json';

import user from './modules/user';

const storedVuex = JSON.parse(localStorage.getItem('vuex')) || {};
const versionLocalStorage = storedVuex.version?.version;

if (versionLocalStorage !== versionWebsite) {
  localStorage.clear();
}

const store = createStore({
  modules: {
    user,
  },
});

store.dispatch('setVersion', versionWebsite);

export default store;
