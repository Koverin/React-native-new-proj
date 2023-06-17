import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { useCallback, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import routerScreen from "./router";

export default function App() {
  const [statusLog, setStatusLog] = useState(false);
  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer onLayout={onLayoutRootView}>
      {routerScreen(statusLog)}
    </NavigationContainer>
  );
}
