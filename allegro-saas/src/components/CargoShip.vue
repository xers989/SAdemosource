<template>
    <v-app class="pt-2 pt-sm-2 pt-xs-2 pt-md-0 pt-lg-0 pt-xl-0">
        <Header :tenant="tenant" :email="email" />
        <v-main height="auto" class="pt-2 pt-sm-2 pt-xs-2 pt-md-0 pt-lg-0 pt-xl-0">
            <router-view></router-view>
        </v-main>
        <Footer />
    </v-app>
</template>

<script>
import Header from "../components/Header";

export default {
  name: "CargoShip",
  components: {
    Header
  },
  data() {
    return {
      tenant: null, 
      email: null
    };
  },
  mounted() {
    this.tenant = this.$store.state.tenant;
    this.email = this.$store.state.email;
    this.$router.push({name: 'cargoShipList', params:{tenant: this.$store.state.tenant}});
  }
}
</script>