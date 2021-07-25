<template>
  <v-app-bar app elevate-on-scroll>
    <v-app-bar-title>Allegro SaaS</v-app-bar-title>
    <span class="ml-2 headline font-weight-thin"> [{{ tenant }}]</span>
    <v-spacer></v-spacer>

    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="150"
      offset-x
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          dark
          v-bind="attrs"
          v-on="on"
        >
          Profile
        </v-btn>
      </template>

      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-title>Tenancy: <b>{{ tenant }}</b> </v-list-item-title>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <img
                src="https://cdn.vuetifyjs.com/images/john.jpg"
                alt="John"
              >
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title><b>Kyudong Kim</b></v-list-item-title>
              <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
         <v-list>
          <v-list-item>
            <v-list-item-title @click="signout" style="cursor:pointer">Sign Out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  name: "Header",
  props: ["tenant", "email"],
  data: () => ({
      fav: true,
      menu: false,
      message: false,
      hints: true,
    }),
  methods: {
    signout () {
      sessionStorage.clear();
       this.$router.push({name: 'signIn'});
    }
  }
}
</script>