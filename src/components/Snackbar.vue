<template>

    <v-snackbar
      :color="color"
      v-model="snackbar"
    >
      <p>{{this.message}}</p>
      <template v-slot:actions>
        <v-btn
          color="white"
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
        color: "",
        timeout: null
    }),
    methods: {
        open(message, color){
            this.color = color
            this.message= message
            this.snackbar = true;
    
            if (this.timeout) clearTimeout(this.timeout);

            this.timeoutId = setTimeout(() => {
                this.snackbar = false;
                this.timeoutId = null; 
            }, 2500);
                }
    }
}

</script>