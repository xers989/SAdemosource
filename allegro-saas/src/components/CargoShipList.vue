<template>
  <v-data-table
    class="pl-10 pr-10"
    :headers="headers"
    :items="shipList"
    :search="search"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Cargo Ship Information {{ $store.state.tenant }}</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>

        <v-icon x-large style="cursor:pointer" @click="openStatistics"> mdi-chart-pie </v-icon>



        
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            
            <v-btn color="blue-grey" v-bind="attrs" v-on="on">
              <span style="color: white">New</span>
            </v-btn>
            
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <!-- <v-list v-if="editedIndex === -1">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>sdfsdf</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list> -->

                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="tenant"
                      label="Tenant"
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.ship"
                      label="Ship"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.type"
                      label="Type"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="2">
                    <v-subheader>Weight</v-subheader>
                  </v-col>
                  <v-col cols="10" sm="5" md="5">
                    <v-text-field
                      v-model="editedItem.size"
                      label="Size"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="10" sm="5" md="5">
                    <v-text-field
                      v-model="editedItem.standard"
                      label="Standard"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="2">
                    <v-subheader>Fuel</v-subheader>
                  </v-col>
                  <v-col cols="10" sm="4" md="4">
                    <v-text-field
                      v-model="editedItem.averagespeed"
                      label="Averagespeed"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="10" sm="3" md="3">
                    <v-text-field
                      v-model="editedItem.milespergallon"
                      label="Milespergallon"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="10" sm="3" md="3">
                    <v-text-field
                      v-model="editedItem.fullyloaded"
                      label="Fullyloaded"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row v-if="tenant == 'Hanjin'">
                  <v-col cols="2">
                    <v-subheader>Capacity</v-subheader>
                  </v-col>
                  <v-col cols="10" sm="5" md="5">
                    <v-text-field
                      v-model="editedItem.combined"
                      label="Combined"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="10" sm="5" md="5">
                    <v-text-field
                      v-model="editedItem.average"
                      label="Average"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn v-if="editMode" color="blue darken-1" text @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>



<v-dialog
      v-model="statisticsDialog"
      scrollable
      max-width="500px"
    >
      
      <v-card>
        <v-card-title>Statistics</v-card-title>
        <v-divider></v-divider>
        
<div style="height:350px">
    <v-container fluid style="width: 500px">
      <v-row dense>
        <v-col cols="6">
          <v-card class="mx-auto" color="#5F0289" dark max-width="350" height="150">
            <v-card-title>
              <span
                style="
                  font-size: 1.2rem;
                  font-weight: 400;
                  color: #ffffff;
                  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
                "
                >Total Size</span
              >
            </v-card-title>
            <v-card-subtitle
              style="font-size: 14px; color: #ffffff; font-family: Arial"
              class="text-h3 font-weight-bold pb-0 pt-3"
            >
              {{ statistics["totalsize"] }}
            </v-card-subtitle>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card class="mx-auto" color="#243141" dark max-width="250" height="150">
            <v-card-title>
              <span
                style="
                  font-size: 1.2rem;
                  font-weight: 400;
                  color: #ffffff;
                  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
                "
                >Average Speed</span
              >
            </v-card-title>
            <v-card-subtitle
              style="font-size: 14px; color: #ffffff; font-family: Arial"
              class="text-h3 font-weight-bold pb-0 pt-3"
            >
              {{ statistics["averagespeed"] }}
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12">
          <v-card class="mx-auto" color="#00AB6D" dark height="150">
            <v-card-title>
              <span
                style="
                  font-size: 1.2rem;
                  font-weight: 400;
                  color: #ffffff;
                  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
                "
                >Miles per Gallon</span
              >
            </v-card-title>
            <v-card-subtitle
              style="font-size: 14px; color: #ffffff; font-family: Arial"
              class="text-h3 font-weight-bold pb-0 pt-3"
            >
              {{ statistics["milspergallon"] }}
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>


        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            color="blue darken-1"
            text
            @click="statisticsDialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


      </v-toolbar>
    </template>
    <template v-slot:item.ship="{ item }">
      <v-chip @click="detailItem(item)" :color="getColor(item.ship)" dark>
        {{ item.ship }}
      </v-chip>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "CargoShipList",
  data() {
    return {
      tenant: this.$store.state.tenant,
      search: "",
      editMode: false,
      dialog: false,
      dialogDelete: false,
      statisticsDialog: false,
      headers: [
        {
          text: "Ship",
          value: "ship",
        },
        { text: "Type", value: "type" },
        { text: "Weight", value: "weight" },
        // { text: "Size", value: "size", align: ' d-none'},
        // { text: "Standard", value: "standard", align: ' d-none'},
        { text: "Averagespeed", value: "averagespeed", align: "center" },
        { text: "Milespergallon", value: "milespergallon", align: "center" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      shipList: [],
      editedIndex: -1,
      editedItem: {},
      defaultItem: {},
      statistics: {},
      }
  },
  created() {
    this.listCargoShip();
  },
  computed: {
    formTitle() {
      return (this.editedIndex === -1 && this.editMode) ? "New Ship" : (this.editedIndex > -1 && this.editMode) ? "Edit Ship" : "Detail Ship";
    },
    isReadonly() {
      return this.editMode ? false : true;
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  methods: {
    getColor (calories) {
        if (calories > 400) return 'red'
        else if (calories > 200) return 'orange'
        else return 'green'
      },
    listCargoShip() {
      let shipList = [];

      this.$axios
        .get("/cargoship/" + this.$store.state.tenant)
        .then((result) => {
          for (let i = 0; i < result.data.length; i++) {
            let shipData = {};
            shipData["ship"] = result.data[i].ship;
            shipData["type"] = result.data[i].type;
            shipData["weight"] = result.data[i].weight.size + " " + result.data[i].weight.standard;
            shipData["size"] = result.data[i].weight.size;
            shipData["standard"] = result.data[i].weight.standard;
            shipData["averagespeed"] = result.data[i].fuel.averagespeed;
            shipData["milespergallon"] = result.data[i].fuel.milespergallon;
            shipData["fullyloaded"] = result.data[i].fuel.fullyloaded;
            if(this.tenant === 'Hanjin') {
              shipData["combined"] = result.data[i].capacity.combined;
              shipData["average"] = result.data[i].capacity.average;
            }
            
            shipList.push(shipData);
          }
          this.shipList = shipList;
        });
    },
    detailItem(item) {
      this.editMode = false;
      this.editedIndex = this.shipList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    editItem(item) {
      this.editMode = true;
      this.editedIndex = this.shipList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.shipList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.shipList.splice(this.editedIndex, 1);

      console.log(this.editedItem);
      this.$axios
          .delete("/cargoship/"+this.tenant+"/"+this.editedItem.ship)
          .then((result) => {
            console.log(result);
            //Object.assign(this.shipList[this.editedIndex], this.editedItem);
            this.listCargoShip();
          });
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      let jsonBody = {};

      jsonBody["tenant"] = this.tenant;
      jsonBody["ship"] = this.editedItem.ship;
      jsonBody["type"] = this.editedItem.type;
      jsonBody["weight"] = {size: this.editedItem.size, standard: this.editedItem.standard};
      jsonBody["fuel"] = {averagespeed: this.editedItem.averagespeed, milespergallon: this.editedItem.milespergallon, fullyloaded: this.editedItem.fullyloaded};

      if(this.tenant === 'Hanjin')
        jsonBody["capacity"] = {capacity: this.editedItem.capacity, average: this.editedItem.average};

      if (this.editedIndex > -1) {
        this.$axios
          .patch("/cargoship/"+this.tenant+"/"+this.editedItem.ship, jsonBody)
          .then((result) => {
            console.log(result);
            //Object.assign(this.shipList[this.editedIndex], this.editedItem);
            this.listCargoShip();


          });
      } else {
        this.$axios
          .post("/cargoship", jsonBody)
          .then((result) => {
            console.log(result);
            this.listCargoShip();
            //this.shipList.push(this.editedItem);
          });
      }
      this.close();
    },
    openStatistics() {
      this.$axios
          .get("/aggregation/"+this.tenant)
          .then((result) => {
            this.statistics["averagespeed"] = result.data[0].averagespeed;
            this.statistics["milspergallon"] = result.data[0].milspergallon.toFixed(5);
            this.statistics["totalsize"] = result.data[0].totalsize;

            this.statisticsDialog = true;
          })
    }
  },
};
</script>