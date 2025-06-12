<template>
   <v-container fluid>
    <v-row>
      
        
        <v-col cols="12">

             <v-card>
                   <v-col cols="12">
                
        <div class="d-flex align-center">
          <div class="text-left text-body-1">
              Products List

          </div>
          <div class="ml-auto">
            <v-btn
                elevated
              color="primary" 
              @click="addProduct"      
            >
              <v-icon class="mr-2">mdi-plus</v-icon> Add
            </v-btn>
          </div>
        </div>
      </v-col>
          <v-divider></v-divider>

      <v-spacer></v-spacer>
      <v-card-title>
        <v-text-field
         v-model="search"
             variant="underlined"
              append-inner-icon="mdi-magnify"
                    label="Search Products"
          single-line
              hide-details
        ></v-text-field>
      </v-card-title>
      </v-card>
        </v-col>
    </v-row>
    <ProductsModal ref="modal" />
  </v-container>
</template>

<script>
import ProductsModal from '../components/modals/productsModal.vue'
export default {
    data(){
        return{
            search: '',
        }
    },
    components: {
        ProductsModal,
        },
        methods: {
            addProduct(){
                this.$refs.modal.open()
            }
        }
}
</script>