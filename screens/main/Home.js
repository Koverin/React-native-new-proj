import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SimpleLineIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import { View, TouchableOpacity, StyleSheet } from "react-native";

const BtmTabs = createBottomTabNavigator();

const Home = () => {
  return (
    <BtmTabs.Navigator screenOptions={styles.container}>
      <BtmTabs.Screen
        options={() => ({
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View style={styles.grid}>
                <SimpleLineIcons name="grid" size={24} color={color} />
              </View>
            );
          },
        })}
        name={"Публікації"}
        component={PostsScreen}
      />
      <BtmTabs.Screen
        options={() => ({
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View style={styles.plus}>
                <AntDesign name="plus" size={24} color={"white"} />
              </View>
            );
          },
        })}
        name={"Створити публікацію"}
        component={CreatePostsScreen}
      />
      <BtmTabs.Screen
        options={() => ({
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View style={styles.user}>
                <Feather name="user" size={24} color={color} />
              </View>
            );
          },
        })}
        name={"Профіль"}
        component={ProfileScreen}
      />
    </BtmTabs.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    headerRight: () => (
      <TouchableOpacity
        onPress={() => alert("This is a button!")}
        style={styles.btnLogOut}
      >
        <Feather name="log-out" size={24} color="#BDBDBD" />
      </TouchableOpacity>
    ),
    headerStyle: {
      height: 88,
      borderBottomWidth: 1,
      borderColor: "#BDBDBD",
    },
    headerTitleAlign: "center",
    headerTitleStyle: {
      fontSize: 17,
      color: "#212121",
      fontFamily: "Roboto-Medium",
    },
    tabBarShowLabel: false,
    tabBarStyle: {
      height: 83,
      paddingTop: 9,
      paddingBottom: 34,
    },
    tabBarInactiveTintColor: "#212121",
  },
  btnLogOut: {
    marginRight: 16,
  },

  grid: {
    width: 40,
    height: 40,
    marginLeft: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
  plus: {
    width: 70,
    height: 40,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginRight: 31,
    marginLeft: 31,
  },
  user: {
    width: 40,
    height: 40,
    marginRight: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
