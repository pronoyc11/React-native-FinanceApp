import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Text, View } from "react-native";
import AppNavigator from "./app/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./app/redux/store";
import { navigationRef } from "./app/NavigationRoot";

export default function App() {
  return (
    <Provider store={store}>

    <NavigationContainer ref={navigationRef}>
      <AppNavigator />
    </NavigationContainer>
    </Provider>
  );
}
