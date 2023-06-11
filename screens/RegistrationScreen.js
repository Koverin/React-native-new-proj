import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Platform,
} from "react-native";
import useKeyboardStatus from "../hooks/useKeyboardStatus";

const RegistrationScreen = ({ changeLog }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [focusName, setFocusName] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);
  const [keyboardStatus] = useKeyboardStatus(Keyboard);
  const [avatar, setAvatar] = useState(true);

  const toggleFocus = useCallback((type) => {
    if (type === "name") setFocusName((prevFocus) => !prevFocus);
    if (type === "email") setFocusEmail((prevFocus) => !prevFocus);
    if (type === "password") setFocusPassword((prevFocus) => !prevFocus);
  }, []);

  const handleSubmit = useCallback(() => {
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
  }, [name, email, password]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, width: "100%" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View
            style={{ ...styles.form, marginBottom: keyboardStatus ? -150 : 0 }}
          >
            <View style={styles.avatar}>
              <TouchableOpacity style={{ width: 25 }}>
                <Image
                  style={styles.icon}
                  source={
                    avatar
                      ? require("../assets/add.png")
                      : require("../assets/deleted.png")
                  }
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.title}>Реєстрація</Text>
            <TextInput
              inputmode="text"
              onChangeText={setName}
              onFocus={() => toggleFocus("name")}
              onBlur={() => toggleFocus("name")}
              style={{
                ...styles.input,
                marginBottom: 16,
                borderColor: focusName ? "#FF6C00" : "#E8E8E8",
              }}
              value={name}
              placeholder="Логін"
            />
            <TextInput
              inputmode="email"
              onChangeText={setEmail}
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
                inputmode="text"
                secureTextEntry={showPassword}
                onFocus={() => toggleFocus("password")}
                onBlur={() => toggleFocus("password")}
                onChangeText={setPassword}
                style={{
                  ...styles.input,
                  borderColor: focusPassword ? "#FF6C00" : "#E8E8E8",
                }}
                value={password}
                placeholder="Пароль"
              />
              <TouchableOpacity
                style={styles.showPass}
                onPress={() =>
                  setShowPassword((prevShowPassword) => !prevShowPassword)
                }
              >
                <Text style={styles.textBtn}>Показати</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={{ ...styles.textBtn, color: "#fff" }}>
                Зареєстуватися
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginLink} onPress={changeLog}>
              <Text style={styles.textBtn}>Вже є акаунт? Увійти</Text>
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
  },
  form: {
    position: "relative",
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 78,
    paddingTop: 92,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    marginTop: "auto",
  },
  avatar: {
    backgroundColor: "#F6F6F6",
    width: 120,
    height: 120,
    borderRadius: 16,
    position: "absolute",
    top: -60,
  },
  icon: {
    position: "absolute",
    width: 25,
    left: 107,
    top: 81,
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
  loginLink: {
    marginBottom: 16,
  },
});

export default RegistrationScreen;
