import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Account } from "../types/Account";


export const useAccount = defineStore('account', {
  state: () => {
    const token = ref<string | null>(null);
    return {
        token,
    };
  },

  actions: {
    setToken(token: string | null) {
        this.token = token

    },
    logout() {
      this.setToken(null);
    },
  },

  persist: true,
});
