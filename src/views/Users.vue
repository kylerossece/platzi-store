<template>
   <v-container fluid>
    <v-row>
        <v-col cols="12">
             <v-card>
                   <v-col cols="12">
                
        <div class="d-flex align-center">
          <!-- <div class="text-left text-body-1">
              User List
          </div> -->
          <div class="ml-auto">
            <v-btn
                elevated
              color="primary" 
              @click="handleUsers"      
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
                    label="Search by Name, Email, Mobile or Username"
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
                <template v-slot:[`item.name.firstname`]="{ item }">
                <div>{{ capitalize(item.name?.firstname) + " " + capitalize(item.name.lastname)}}</div>
              </template>

              <template v-slot:[`item.actions`]="{ item }">
                <div class="d-flex flex-nowrap ga-2">
                <v-btn
                  color="primary"
                  size="x-small"
                  @click="handleUsers(item, 'Edit')"
                >
                  Edit
                </v-btn>
                <v-btn color="error" size="x-small"  @click="handleUsers(item, 'Delete')">
                  Delete
                </v-btn>
                </div>
              </template>

            </v-data-table>
          </div>
           
      </v-card>
        </v-col>
    </v-row>
    <UsersModal  ref="modal" />
  </v-container>
</template>

<script>
import UsersModal from '../components/modals/usersModal.vue'
import methods from "../mixins/methods"
export default {
    mixins: [methods],
    data(){
        return{
            search: '',
            loading: true,
            filteredTable: [],
            table: {
                data: [],
                loading: false,
                headers: [
                {
                    title: "Name",
                    key: "name.firstname",
                },
                {
                    title: "Email", 
                    key: "email" 
                },
                  {
                    title: "Mobile No.", 
                    key: "phone" 
                },
                  {
                    title: "Username", 
                    key: "username" 
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
        UsersModal,
        },
        methods: {
            getList(){
                this.table.loading = true;
                this.$api.get("/users").then((response) => {
                    const {data} = response;
                    this.table.data =[...data];

                }).catch((error) => {
                    console.error(error)
                }).finally(() =>{
                    this.table.loading = false;
                })
            },
       
            handleUsers(data,action){
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
            return (
              item.name?.firstname?.toLowerCase().includes(val.toLowerCase()) ||
              item.name?.lastname?.toLowerCase().includes(val.toLowerCase()) ||
              item.email?.toLowerCase().includes(val.toLowerCase()) ||
              item.phone?.toLowerCase().includes(val.toLowerCase()) ||
              item.username?.toLowerCase().includes(val.toLowerCase())
            );
          });
        }  else {
              this.filteredTable.splice(0,  this.filteredTable.length)
            }
          }
        },
        created(){
            this.getList()
        }
}
</script>