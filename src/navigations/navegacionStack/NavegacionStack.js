import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../../screens/login/Login";
import Register from "../../screens/register/Register";
import NavegacionTab from "../navegacionTab/NavegacionTab";

const Stack = createNativeStackNavigator();

function NavegacionStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="NavegacionTab" component={NavegacionTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavegacionStack;