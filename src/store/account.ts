import { defineStore } from 'pinia';
import { ref } from 'vue';


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
