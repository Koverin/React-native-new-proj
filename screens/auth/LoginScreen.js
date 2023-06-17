import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  ImageBackground,
} from "react-native";
import useKeyboardStatus from "../../hooks/keyboardStatus";

const LoginScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [focusName, setFocusName] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);
  const [keyboardStatus] = useKeyboardStatus(Keyboard);

  const toggleFocus = (type) => {
    if (type === "name") return setFocusName(!focusName);
    if (type === "email") return setFocusEmail(!focusEmail);
    if (type === "password") return setFocusPassword(!focusPassword);
  };

  const handleSubmit = () => {
    const data = {
      name,
      email,
      password,
    };
    console.log(data);

    setName("");
    setEmail("");
    setPassword("");
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, width: "100%" }}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <ImageBackground
            source={require("../../assets/hill-bg-img.jpg")}
            style={styles.image}
          ></ImageBackground>
          <View
            style={{ ...styles.form, marginBottom: keyboardStatus ? -241 : 0 }}
          >
            <Text style={styles.title}>Увійти</Text>

            <TextInput
              inputMode="email"
              onChangeText={(text) => setEmail(text)}
              onFocus={() => toggleFocus("email")}
              onBlur={() => toggleFocus("email")}
              style={{
                ...styles.input,
                marginBottom: 16,
                borderColor: focusEmail ? "#FF6C00" : "#E8E8E8",
              }}
              value={email}
              placeholder="Адреса електронної пошти"
            />

            <View style={styles.containerPassword}>
              <TextInput
                inputMode="text"
                secureTextEntry={showPassword}
                onFocus={() => toggleFocus("password")}
                onBlur={() => toggleFocus("password")}
                onChangeText={(text) => setPassword(text)}
                style={{
                  ...styles.input,
                  borderColor: focusPassword ? "#FF6C00" : "#E8E8E8",
                }}
                value={password}
                placeholder="Пароль"
              />
              <TouchableOpacity
                style={styles.showPass}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text style={styles.textBtn}>
                  {showPassword ? "Показати" : "Скрити"}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={{ ...styles.textBtn, color: "#fff" }}>Увійти</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.loginLink}
              onPress={() => navigation.navigate("Registration")}
            >
              <Text style={styles.textBtn}>Немає акаунту? Зареєструватися</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    resizeMode: "contain",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  form: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 144,
    paddingTop: 32,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    marginTop: "auto",
  },
  title: {
    color: "#212121",
    fontSize: 30,
    lineHeight: 35,
    marginBottom: 33,
    fontFamily: "Roboto-Medium",
  },
  input: {
    width: "100%",
    height: 50,
    padding: 16,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    fontFamily: "Roboto-Regular",
  },
  containerPassword: {
    position: "relative",
    width: "100%",
    marginBottom: 43,
  },
  showPass: {
    backgroundColor: "transparent",
    position: "absolute",
    right: 0,
    padding: 16,
  },
  textBtn: {
    color: "#1B4371",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
  },
  submitBtn: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    fontFamily: "Roboto-Regular",
  },
});

export default LoginScreen;
