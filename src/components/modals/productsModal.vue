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
                                <v-col cols="12" md="3">
                                    <v-text-field
                                    label="Title"
                                    v-model="form.title"
                                    :rules="rules.required"
                                    ></v-text-field>
                                </v-col>
                                    <v-col cols="12" md="3">
                                    <v-text-field
                                    type="number"
                                    label="Price"
                                    v-model="form.price"
                                    :rules="rules.required"
                                    ></v-text-field>
                                </v-col>
                                    <v-col cols="12" md="3">
                                           <v-text-field
                                    label="Description"
                                    v-model="form.description"
                                    :rules="rules.required"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
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
            reject: null,
            form: {},
               rules: {
              required: [(value) => !!value || "Required."],
     
      },
        }
    },
    methods:{
        open(){
        this.dialog = true;
            
        this.form = {
              title: "",
              price: 0,
             description: "",
             categoryId: 0,
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

    },
    }
}
</script>