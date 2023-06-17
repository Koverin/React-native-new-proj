import React from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";

import RegistrationScreen from "./screens/auth/RegistrationScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import Home from "./screens/main/Home";

const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();

const routerScreen = (params) => {
  if (params) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={RegistrationScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
      </AuthStack.Navigator>
    );
  }

  return (
    <MainStack.Navigator>
      <MainStack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      />
    </MainStack.Navigator>
  );
};

export default routerScreen;
