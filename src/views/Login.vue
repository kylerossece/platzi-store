<template>

 <v-row class="d-flex justify-center">
      <Snackbar ref="snack"/>
    <v-col cols="12" md="6" lg="4">
          <v-card class="elevation-5">
            <v-toolbar dark color="primary">
              <v-toolbar-title class="text-center">Welcome!</v-toolbar-title>
            </v-toolbar>
              <v-card-text>
                <v-form ref="form" lazy-validation>
                <v-row class="ma-3">
                    <v-col cols="12">
                          <v-text-field
                                    variant="underlined"
                                    color="primary"
                                    label="Username"
                                    v-model="username"
                                    :rules="rules.required"
                                    @keypress.enter.prevent="login()"
                                    ></v-text-field>
                    </v-col>
                      <v-col cols="12">
                              <v-text-field
                                    @keypress.enter.prevent="login()"
                                    variant="underlined"
                                    color="primary"
                                    label="Password"
                                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="showPassword ? 'text' : 'password'"
                                    @click:append="showPassword = !showPassword"
                                    v-model="password"
                                    :rules="rules.required"
                                    ></v-text-field>
                    </v-col>
                </v-row>
                </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-end me-8 pb-8 ">
            <v-btn @click.prevent="login" color="primary" variant="elevated" class="pl-5 pr-5  text-body-1" 
            :disabled="loading"
             :loading="loading">
                Login
            </v-btn>
        </v-card-actions>
        </v-card>
        
            </v-col> 
        </v-row>
  
</template>

<script>
import Snackbar from "../components/Snackbar.vue"
import { useAccount } from "../store/account";

export default{
  setup(){
     const account = useAccount();
      return { account };
  },
    data: () => ({
        // username: "",
        // password: "",
         username: "johnd",
        password: "m38rmF$",
        showPassword: false,
        loading: false,
        rules: {
        required: [(value) => !!value || "Required."],
      },
    }),
    components: {Snackbar},
    methods: {
        login(){
               if (!this.$refs.form.validate()) {
                return false;
            }
            this.loading = true
            const payload = {
              username: this.username,
              password: this.password
            }
            this.$api.post("/auth/login", payload).then((response) => {
         
              const {token} = response.data
         
              this.account.setToken(token);
              this.account.setUsername(this.username);
              if(this.account.token){
                this.$router.push("/")
              }
            }).catch((error) => {
              this.$refs.snack.open(error.message || error, 'red-darken-2')
              console.error(error)
            }).finally(() => {
              this.loading = false;
            })
        }
    }
}
</script>