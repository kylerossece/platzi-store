<template>
<v-row>
    <v-col cols="12">
        <v-dialog v-model="dialog" persistent max-width="720px">
            <v-card>
                <v-form ref="form" lazy-validation>
                       <v-card-title class="d-flex justify-space-between align-center">
                <div >
                    {{action}} Product
                </div>

                <v-btn
                  icon="mdi-close"
                  variant="text"
                  @click="dialog = false"
                ></v-btn>
              </v-card-title>
                    <v-card-text>
                        <v-container v-if="this.action != 'Delete'">
                            <v-row >
                                <v-col cols="12" >
                                    <v-text-field
                                    variant="underlined"
                                       color="primary"
                                    label="Title"
                                    v-model="form.title"
                                    :rules="rules.required"
                                    ></v-text-field>
                                </v-col>
                                    <v-col cols="12" >
                                    <v-text-field
                                    variant="underlined"
                                   color="primary"
                                    type="number"
                                    label="Price"
                                    v-model="form.price"
                                    :rules="rules.required"
                                    ></v-text-field>
                                </v-col>
                                    <v-col cols="12">
                                    <v-text-field
                                    variant="underlined"
                                           color="primary"
                                    label="Description"
                                    v-model="form.description"
                                    :rules="rules.required"
                                    ></v-text-field>
                                </v-col>
                                    <v-col cols="12">
                                    <v-select
                                    variant="underlined"
                            
                                    label="Category"
                           
                                           color="primary"
                                
                                    :items="category"
                                    v-model="form.category"
                                    :rules="rules.required"
                                    ></v-select>
                                </v-col>
                                   <v-col cols="12">
                                           <v-text-field
                                    variant="underlined"
                                       color="primary"
                                    label="Image Link"
                                    v-model="form.image"
                                    :rules="rules.required"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                           
                        </v-container>
                         <div class="text-body-1" v-else>
                                Are you sure you want to delete this product?
                            </div>
                    </v-card-text>
                       <v-card-actions class="pb-3">
              <v-spacer></v-spacer>
              <v-btn @click="cancel">
                Cancel
              </v-btn>
              <v-btn
                :color="action == 'Delete' ? 'red-darken-2' : 'primary'"
                :loading="loading"
                :disabled="loading"
                @click="handleProducts"
                class="px-10"
              >
               {{action == 'Delete' ? 'Delete' : 'Submit'}}
              </v-btn>
            </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
    </v-col>
    <Snackbar ref="snack"></Snackbar>
</v-row>

</template>

<script>
import Snackbar from "../Snackbar.vue"
export default {
    data(){
        return {
            dialog:false,
            resolve: null,
            loading: false,
            action: null,
            reject: null,
            data: {},
            id: null,
            timeout: null,
            form: {},
               rules: {
              required: [(value) => !!value || "Required."],
     
      },
        }
    },
    props: {
        products: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    components: {Snackbar},
    computed: {
        category(){
            const category = this.products.length ? this.products.map((item) => {
               return item.category
            }) : []
            return [...new Set(category)]
        }
    },
    methods:{
        open(data = {}, action = "Add"){
        this.dialog = true;
        this.action = action;
        this.data = data

        this.form = {  
        id: null,
        title: "",
        price: "",
        description: "",
        category: "",
        image: ""
        }
        if(this.action == "Edit"){
             Object.keys(data)
          .filter((key) => key in this.form)
          .forEach((key) => (this.form[key] = data[key]));
      
            }
    return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
        },

    cancel() {
      this.resolve(false);
      this.dialog = false;
    },
    AddProduct(){
        this.loading = true;
        this.$api.post("/products", this.form).then((response) => {
            const {data} = response 
            if(Object.keys(data)?.length){
                this.$refs.snack.open("Successfully Added Product", "success")
                if(this.timeout) clearTimeout(this.timeout);

                this.timeout = setTimeout(() => {
                    this.dialog = false
                }, 2500)
            }
        }).catch((error) => {
              this.$refs.snack.open(error.message || error, "red-darken-2")
        }).finally(() => {
            this.loading = false;

        });
    },
     EditProduct(){
        this.loading = true;
     

        this.$api.put(`/products/${this.data.id}`, this.form).then((response) => {
            const {data} = response 
            if(Object.keys(data)?.length){
                this.$refs.snack.open("Successfully Edited Product", "success")
                if(this.timeout) clearTimeout(this.timeout);

                this.timeout = setTimeout(() => {
                    this.dialog = false
                }, 2500)
            }
        }).catch((error) => {
              this.$refs.snack.open(error.message || error, "red-darken-2")
        }).finally(() => {
            this.loading = false;

        });
    },
        DeleteProduct(){
        this.loading = true;
     

        this.$api.delete(`/products/${this.data.id}`).then((response) => {
            const {data} = response 
            if(Object.keys(data)?.length){
                this.$refs.snack.open("Successfully Deleted Product", "success")
                if(this.timeout) clearTimeout(this.timeout);

                this.timeout = setTimeout(() => {
                    this.dialog = false
                }, 2500)
            }
        }).catch((error) => {
              this.$refs.snack.open(error.message || error, "red-darken-2")
        }).finally(() => {
            this.loading = false;

        });
    },
    async handleProducts(){
         const { valid } = await this.$refs.form.validate();
         if (!valid) return;
        if(this.action === "Add"){
            this.AddProduct()
        } else if(this.action === "Edit"){
            this.EditProduct()
        } else if(this.action === "Delete"){
            this.DeleteProduct()
        }
    }
    }
}
</script>