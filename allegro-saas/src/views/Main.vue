<template>
    <v-app>
        <Header :tenant="tenant" :email="email" />
        <v-main>
            <CargoShip/>
        </v-main>
        <Footer />
    </v-app>
</template>

<script>
import Header from "../components/Header";
import CargoShip from "../components/CargoShip";

export default {
  name: 'App',

  components: {
    Header,
    CargoShip
  },
  data() {
    return {
      tenant: null, 
      email: null
    };
  },
  mounted() {
    this.tenant = this.$route.params.tenant;
    this.email = this.$route.params.email;
  }
};
</script>