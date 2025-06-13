import { defineStore } from 'pinia';
import { ref } from 'vue';


export const useAccount = defineStore('account', {
  state: () => {
    const token = ref<string | null>(null);
    const username = ref<string | null>(null);
    return {
        token,
        username
    };
  },

  actions: {
    setToken(token: string | null) {
        this.token = token

    },
    setUsername(username: string | null) {
        this.username = username

    },
    logout() {
      this.setUsername(null);
      this.setToken(null);
    },
  },

  persist: true,
});
