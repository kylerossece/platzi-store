<template>
<v-row>
    <v-col cols="12">
        <v-dialog v-model="dialog" persistent max-width="720px">
            <v-card>
                <v-form ref="form" lazy-validation>
                       <v-card-title class="d-flex justify-space-between align-center">
                <div >
                    Add Product
                </div>

                <v-btn
                  icon="mdi-close"
                  variant="text"
                  @click="dialog = false"
                ></v-btn>
              </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
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
                                    item-value="name"
                                           color="primary"
                                    item-text="name"
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
                    </v-card-text>
                       <v-card-actions class="pb-5">
              <v-spacer></v-spacer>
              <v-btn @click="cancel">
                Cancel
              </v-btn>
              <v-btn
                color="primary"
                :loading="loading"
                :disabled="loading"
                @click="handleProducts"
                class="px-10"
              >
                Submit
              </v-btn>
            </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
    </v-col>
</v-row>

</template>

<script>
export default {
    data(){
        return {
            dialog:false,
            resolve: null,
            loading: false,
            action: null,
            reject: null,
            form: {},
               rules: {
              required: [(value) => !!value || "Required."],
     
      },
        }
    },
    methods:{
        open(data = {}, action = "add"){
        this.dialog = true;
        this.action = action;
            if(this.action == "edit"){
            Object.keys(form)
            .filter((key) => key in data)
            .forEach((key) => {
            form[key] = data[key];
            });

            }
        this.form = {
              
        id: null,
        title: "",
        price: "",
        description: "",
        category: "",
        image: ""
        }
    return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
        },
    agree() {
      this.resolve(true);
      this.dialog = false;
    },

    cancel() {
      this.resolve(false);
      this.dialog = false;
    },
    addProduct(){
        this.$api.post("/products", this.form).then((response) => {
            console.log("response", response)
        }).catch((error) => {
            console.error("Error adding product:", error);
        }).finally(() => {
            this.loading = false;

        });
    },
    async handleProducts(){
         const { valid } = await this.$refs.form.validate();
         if (!valid) return;
        if(this.action === "add"){
            this.addProduct()
        } else if(this.action === "edit"){
            this.editProduct()
        } else if(this.action === "delete"){
            this.deleteProduct()
        }
    }
    }
}
</script>