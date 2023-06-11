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
  Platform,
} from "react-native";
import useKeyboardStatus from "../hooks/useKeyboardStatus";

const LoginScreen = ({ changeLog }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [focus, setFocus] = useState({
    name: false,
    email: false,
    password: false,
  });
  const [keyboardStatus] = useKeyboardStatus(Keyboard);

  const toggleFocus = (field) => {
    setFocus((prevFocus) => ({
      ...prevFocus,
      [field]: !prevFocus[field],
    }));
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
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View
            style={{ ...styles.form, marginBottom: keyboardStatus ? -241 : 0 }}
          >
            <Text style={styles.title}>Увійти</Text>

            <TextInput
              keyboardType="email-address"
              onChangeText={setEmail}
              onFocus={() => toggleFocus("email")}
              onBlur={() => toggleFocus("email")}
              style={{
                ...styles.input,
                marginBottom: 16,
                borderColor: focus.email ? "#FF6C00" : "#E8E8E8",
              }}
              value={email}
              placeholder="Адреса електронної пошти"
            />

            <View style={styles.containerPassword}>
              <TextInput
                secureTextEntry={showPassword}
                onFocus={() => toggleFocus("password")}
                onBlur={() => toggleFocus("password")}
                onChangeText={setPassword}
                style={{
                  ...styles.input,
                  borderColor: focus.password ? "#FF6C00" : "#E8E8E8",
                }}
                value={password}
                placeholder="Пароль"
              />
              <TouchableOpacity
                style={styles.showPass}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text style={styles.textBtn}>
                  {showPassword ? "show" : "hide"}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={{ ...styles.textBtn, color: "#fff" }}>Увійти</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginLink} onPress={changeLog}>
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
