<template>

    <v-snackbar
    
      v-model="snackbar"
    >
      <p>{{this.message}}</p>
      <template v-slot:actions>
        <v-btn
          color="red"
          variant="text"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
</template>

<script>
export default {
    data: () => ({
        snackbar: false,
        message: "",
        timeout: null
    }),
    methods: {
        open(message){
            this.snackbar = true;
            this.message= message
            if (this.timeout) clearTimeout(this.timeout);

            this.timeoutId = setTimeout(() => {
                this.snackbar = false;
                this.timeoutId = null; 
            }, 2000);
                }
    }
}

</script>