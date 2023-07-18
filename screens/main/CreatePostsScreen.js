import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Camera } from "expo-camera";
import { FontAwesome } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

const CreatePostsScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [namePost, setNamePost] = useState("");
  const [locationPost, setLocationPost] = useState("");
  const [locationPostCoord, setLocationPostCoord] = useState({});
  const [locationStatus, setLocationStatus] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      setLocationStatus(status === "granted");
    })();
  }, []);

  const clearData = () => {
    setPhoto(null);
    setNamePost("");
    setLocationPost("");
  };

  const giveNavigate = () => {
    navigation.navigate("Публікації", {
      photo,
      namePost,
      locationPost,
      locationPostCoord,
    });
  };

  const onSubmit = async () => {
    if (true) {
      const location = await Location.getCurrentPositionAsync();
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocationPostCoord(coords);
    }

    giveNavigate();
    clearData();
  };

  const takePhoto = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      await MediaLibrary.createAssetAsync(uri);
      setPhoto(uri);
    }
    const location = await Location.getCurrentPositionAsync({});
    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setLocationPostCoord(coords);
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return (
      <Text style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        No access to camera
      </Text>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Camera
            style={styles.camera}
            type={type}
            ref={(ref) => {
              setCameraRef(ref);
            }}
          >
            <View style={styles.photoContainer}>
              <Image source={{ uri: photo }} style={styles.photo} />
              <TouchableOpacity
                style={{
                  ...styles.btnSnap,
                  backgroundColor: photo ? "#FFFFFF4D" : "#fff",
                }}
                onPress={takePhoto}
              >
                <FontAwesome
                  name="camera"
                  size={24}
                  color={photo ? "#fff" : "#BDBDBD"}
                />
              </TouchableOpacity>
            </View>
          </Camera>
          <Text style={{ ...styles.text, marginRight: "auto" }}>
            {photo ? "Завантажте фото" : "Редагувати фото"}
          </Text>
          <View style={styles.form}>
            <TextInput
              value={namePost}
              onChangeText={(value) => setNamePost(value)}
              style={{
                ...styles.input,
                borderBottomWidth: 1,
                borderColor: "#E8E8E8",
              }}
              type="text"
              name="name"
              placeholder="Назва..."
              placeholderTextColor="#BDBDBD"
            />
            <View style={styles.inputContainerLocation}>
              <EvilIcons name="location" size={24} color="#BDBDBD" />
              <TextInput
                value={locationPost}
                onChangeText={(value) => setLocationPost(value)}
                style={{ ...styles.input, marginLeft: 4, paddingRight: 28 }}
                type="text"
                name="location"
                placeholder="Місцевість......"
                placeholderTextColor="#BDBDBD"
              />
            </View>
            <TouchableOpacity
              disabled={photo !== null && namePost !== "" ? false : true}
              style={{
                ...styles.btnSubmit,
                backgroundColor:
                  photo !== null && namePost !== "" ? "#FF6C00" : "#F6F6F6",
              }}
              onPress={() => onSubmit()}
            >
              <Text
                style={{
                  ...styles.text,
                  marginTop: 0,
                  color: photo !== null && namePost !== "" ? "#fff" : "#BDBDBD",
                }}
              >
                Опубліковати
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => clearData()} style={styles.btnTrash}>
            <Feather name="trash-2" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    alignItems: "center",
  },
  camera: {
    position: "relative",
    width: "100%",
    height: 240,
    marginTop: 32,
  },
  photoContainer: {
    width: "100%",
    height: 240,
  },
  photo: {
    width: "100%",
    height: 240,
  },
  btnSnap: {
    position: "absolute",
    top: 90,
    left: Dimensions.get("window").width / 2 - 40,
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  btmIcon: {
    backgroundColor: "#BDBDBD",
  },
  text: {
    marginTop: 8,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#BDBDBD",
  },
  form: {
    width: "100%",
    marginTop: 32,
  },
  input: {
    width: "100%",
    height: 50,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#212121",
  },
  inputContainerLocation: {
    width: "100%",

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
  },
  btnSubmit: {
    width: "100%",
    height: 50,
    borderRadius: 100,
    marginTop: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  btnTrash: {
    width: 70,
    height: 40,
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "auto",
    marginBottom: 34,
  },
});

export default CreatePostsScreen;
