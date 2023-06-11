import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ImageBackground, Dimensions } from "react-native";
import { useCallback, useState } from "react";
import RegistrationScreen from "./screens/RegistrationScreen";
import LoginScreen from "./screens/LoginScreen";
import * as SplashScreen from "expo-splash-screen";

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

  const chengeLog = () => setStatusLog(!statusLog);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ImageBackground
        style={styles.images}
        source={require("./assets/hill-bg-img.jpg")}
      ></ImageBackground>
      <View style={styles.container} onLayout={onLayoutRootView}>
        {statusLog ? (
          <LoginScreen chengeLog={chengeLog} />
        ) : (
          <RegistrationScreen chengeLog={chengeLog} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  images: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
