<template>
   <v-container fluid>
    <v-row>
        <v-col cols="12">
             <v-card>
                   <v-col cols="12">
                
        <div class="d-flex align-center">
          <!-- <div class="text-left text-body-1">
              Cart List
          </div> -->
          <div class="ml-auto">
            <v-btn
                elevated
              color="primary" 
              @click="handleCarts"      
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
                    label="Search by Name or Email"
                    variant="underlined"
                    clearable
    
        ></v-text-field>
      </v-card-title>
            <v-spacer></v-spacer>
                <div class="pa-4">
            <v-data-table
              :headers="table.headers"
              :items="filteredTable.length ? filteredTable : table.data"
              :items-per-page="10"
              :loading="table.loading"
              loading-text="Loading... Please wait"
              class="elevation-1"
              
            >
                <template v-slot:[`item.date`]="{ item }">
                <div>{{ dateFormatter(item.date)}}</div>
              </template>
                <template v-slot:[`item.userId`]="{ item }">
                <div>{{capitalize(this.getUserDetails(item.userId)?.name?.firstname)}} 
                    {{capitalize(this.getUserDetails(item.userId)?.name?.lastname)}}</div>
              </template>
                <template v-slot:[`item.id`]="{ item }">
                <div>{{this.getUserDetails(item.userId)?.email}} 
                </div>
              </template>
               <template v-slot:[`item.products`]="{ item }">
                <div v-for="(product, index) in item.products" :key="index">
                    {{this.getProductDetails(product.productId)}} (Quantity : {{product.quantity}})
                </div>
              </template>

              <template v-slot:[`item.actions`]="{ item }">
                <div class="d-flex flex-nowrap ga-2">
                <v-btn
                  color="primary"
                  size="x-small"
                  @click="handleCarts(item, 'Edit')"
                >
                  Edit
                </v-btn>
                <v-btn color="error" size="x-small"  @click="handleCarts(item, 'Delete')">
                  Delete
                </v-btn>
                </div>
              </template>

            </v-data-table>
          </div>
           
      </v-card>
        </v-col>
    </v-row>
    <CartModal :products="products" :users="users" ref="modal" />
  </v-container>
</template>

<script>
import CartModal from '../components/modals/cartModal.vue'
import methods from "../mixins/methods"
export default {
    mixins: [methods],
    data(){
        return{
            search: '',
            loading: true,
            users: [],
            products: [],
            filteredTable: [],
            table: {
                data: [],
                loading: false,
                headers: [
            
                {
                    title: "Name", 
                    key: "userId" ,

                },
                  {
                    title: "Email", 
                    key: "id" 
                },
                  {
                    title: "Products", 
                    key: "products" 
                },
                    {
                    title: "Date/Time Created",
                    key: "date",
                },
                  {
                    title: "Actions",
                    key: "actions",

                },
                ],
            },
        }
    },
    components: {
       CartModal
        },
        methods: {
            getList(){
                this.table.loading = true;
                this.$api.get("/carts").then((response) => {
                    const {data} = response;
                    this.table.data =[...data];

                }).catch((error) => {
                    console.error(error)
                }).finally(() =>{
                    this.table.loading = false;
                })
            },

            getUser(){
                    this.table.loading = true;
                this.$api.get("/users").then((response) => {
                    const {data} = response;
                    this.users =[...data];

                }).catch((error) => {
                    console.error(error)
                })
            },
            getProducts(){
                this.table.loading = true;
                this.$api.get("/products").then((response) => {
                    const {data} = response;
                    this.products =[...data];
                }).catch((error) => {
                    console.error(error)
                })
            },
            getUserDetails(userId){
                return this.users.find(user => user.id === userId);
            },
            getProductDetails(productId){
                return this.products.find(product => product.id === productId)?.title;
            },
       
            handleCarts(data,action){
                this.$refs.modal.open(data, action).then((result) => {
                    if(result){
                        this.getList();
                    }
                })
            }
        },
            watch: {
          search(val){
        if (val) {
          this.filteredTable = this.table.data.filter(item => {
        const user = this.getUserDetails(item.userId);

        const name = `${user?.name?.firstname || ''} ${user?.name?.lastname}`.toLowerCase();
        const email= user?.email?.toLowerCase();

        return name.includes(val.toLowerCase()) ||  email.includes(val.toLowerCase());
      });
        }  else {
              this.filteredTable.splice(0,  this.filteredTable.length)
            }
          }
        },
        async created(){
            await this.getProducts();
            await this.getUser()
            await this.getList()
        }
}
</script>
