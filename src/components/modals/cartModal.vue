<template>
<v-row>
    <v-col cols="12">
        <v-dialog v-model="dialog" persistent max-width="720px">
            <v-card>
                <v-form ref="form" lazy-validation>
                       <v-card-title class="d-flex justify-space-between align-center">
                <div >
                    {{action}} Cart
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
                                <v-col cols="12" class="d-flex justify-end mb-4">
                                         <v-btn @click="addProduct" color="primary"><v-icon class="mr-2">mdi-plus</v-icon>Add Product</v-btn>
                                </v-col>
                           
                                <v-row class="ma-0" v-for="(product, index) in form.products" :key="index">
                                    <v-col cols="6">
                                    <v-select
                                    variant="underlined"
                            
                                    label="Product"
                                    color="primary"
                                    :item-title="products.title"
                                    :item-value="(item) => item" 
                                
                                    :items="products"
                                    v-model="product.productId"
                                    :rules="rules.required"
                                    ></v-select>
                                </v-col>
                                     <v-col cols="6" class="d-flex ga-2">
                                      <v-text-field
                                    variant="underlined"
                                     color="primary"
                                    type="number"
                                    label="Quantity"
                                    v-model="product.quantity"
                                    :rules="rules.required"

                                    ></v-text-field>
                                       <v-btn
                                    icon="mdi-close"
                                    variant="text"
                                    @click="removeProduct"
                                    ></v-btn>
                                    <div>

                                    </div>
                                </v-col>
                                </v-row >
                            </v-row>
                           
                        </v-container>
                         <div class="text-body-1" v-else>
                                Are you sure you want to delete this cart?
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
        },
        users: {
             type: Array,
            default: () => {
                return []
            } 
        }
    },
    components: {Snackbar},
    computed: {
    },
    methods:{
        open(data = {}, action = "Add"){
        this.dialog = true;
        this.action = action;
        this.data = data

        this.form = {  
        products: [{
            productId: "",
            quantity: 0,
        }]
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
    addProduct(){
        this.form.products.push({ productId: "",
            quantity: 0,})
    },
    removeProduct(index){
        this.form.products.splice(index,1)
    },
    AddCart(){
        this.loading = true;
        this.$api.post("/carts", this.form).then((response) => {
            const {data} = response 
            if(Object.keys(data)?.length){
                this.$refs.snack.open("Successfully Added Cart", "success")
                if(this.timeout) clearTimeout(this.timeout);

                this.timeout = setTimeout(() => {
                     this.resolve(true); 
                    this.dialog = false
                }, 2500)
            }
        }).catch((error) => {
              this.$refs.snack.open(error.message || error, "red-darken-2")
        }).finally(() => {
            this.loading = false;

        });
    },
     EditCart(){
        this.loading = true;
     

        this.$api.put(`/carts/${this.data.id}`, this.form).then((response) => {
            const {data} = response 
            if(Object.keys(data)?.length){
                this.$refs.snack.open("Successfully Edited Cart", "success")
                if(this.timeout) clearTimeout(this.timeout);

                this.timeout = setTimeout(() => {
                     this.resolve(true); 
                    this.dialog = false
                }, 2500)
            }
        }).catch((error) => {
              this.$refs.snack.open(error.message || error, "red-darken-2")
        }).finally(() => {
            this.loading = false;

        });
    },
        DeleteCart(){
        this.loading = true;
     

        this.$api.delete(`/carts/${this.data.id}`).then((response) => {
            const {data} = response 
            if(Object.keys(data)?.length){
                this.$refs.snack.open("Successfully Deleted Cart", "success")
                if(this.timeout) clearTimeout(this.timeout);

                this.timeout = setTimeout(() => {
                     this.resolve(true); 
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
            this.AddCart()
        } else if(this.action === "Edit"){
            this.EditCart()
        } else if(this.action === "Delete"){
            this.DeleteCart()
        }
    }
    }
}
</script>