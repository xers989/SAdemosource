import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { AuthProvider } from "./components/authProvider";
import { ContainersProvider } from "./components/containersProvider";

import { WelcomeView } from "./views/WelcomeView";
import { ProjectsView } from "./views/ProjectsView";
import { ContainersView } from "./views/ContainersView";

import { Logout } from "./components/logout";

const Stack = createStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Welcome View"
            component={WelcomeView}
            options={{ title: "Allegro" }}
          />
          <Stack.Screen
            name="Tenant"
            component={ProjectsView}
            title="ProjectsView"
            headerBackTitle="log out"
            options={{
              headerLeft: function Header() {
                return <Logout />;
              },
            }}
          />
          <Stack.Screen name="Container List">
            {(props) => {
              const { navigation, route } = props;
              const { user, projectPartition } = route.params;
              return (
                <ContainersProvider user={user} projectPartition={projectPartition}>
                  <ContainersView navigation={navigation} route={route} />
                </ContainersProvider>
              );
            }}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;