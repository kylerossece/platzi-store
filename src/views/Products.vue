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
              @click="handleProduct"      
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
                color="primary"
              append-inner-icon="mdi-magnify"
                    label="Search Product"
                    variant="underlined"
    
        ></v-text-field>
      </v-card-title>
            <v-spacer></v-spacer>
            <v-card-text v-if="products.length">
          <v-row >
            <v-col data-aos="zoom-in"  class="d-flex" v-for="item in products" :key="item.id" cols="12" md="6" lg="4">
              <v-card  class="d-flex flex-column" height="100%" width="100%">
                <v-card-title class="text-body-2 d-flex justify-between align-center bg-primary rounded-t-lg">
                <span class="text-truncate" style="max-width: 80%;">{{item.title}}</span>
                <v-icon @click="handleProduct(item, 'Delete')" class="text-white ml-auto cursor-pointer">mdi-close</v-icon>
                </v-card-title>
                    <v-divider></v-divider>
                    <v-img class="mb-5 mt-5"  height="125" :src="item.image">
                    </v-img>
                       <v-divider></v-divider>
                    <v-card-text>{{item.description}}</v-card-text>
                          <v-divider></v-divider>
                          <v-card-text>
                            <p>
                                Price: ${{item.price}}
                            </p>
                            <p>
                                    Stock: {{item.rating?.count}}
                            </p>
                            <p v-if="item.rating" class="d-flex align-center">
                                   Rating: 
                                         <v-rating
                                        size="x-small"
                                        v-model="item.rating.rate"
                                        readonly
                                        ></v-rating>
                            </p>
                        
                            </v-card-text>
                           <p class="mr-4 pb-4 text-primary text-body-1 cursor-pointer text-decoration-underline text-end" @click="handleProduct(item, 'Edit')">[Edit]</p>
                 
                    </v-card>
            </v-col>

          </v-row>
          </v-card-text>
           
      </v-card>
        </v-col>
    </v-row>
    <ProductsModal :products="products" ref="modal" />
  </v-container>
</template>

<script>
import ProductsModal from '../components/modals/productsModal.vue'
export default {
    data(){
        return{
            search: '',
            loading: true,
            products: []
        }
    },
    components: {
        ProductsModal,
        },
        methods: {
            getList(){
                this.$api.get("/products").then((response) => {
                    const {data} = response;
                    this.products =[...data];

                }).catch((error) => {
                    console.error(error)
                })
            },
       
            handleProduct(data,action){
                this.$refs.modal.open(data, action).then((result) => {
                    if(result){
                        this.getList();
                    }
                })
            }
        },
        created(){
            this.getList()
        }
}
</script>