import { StatusBar } from "expo-status-bar";
import React from "react";
import TaskApp from "./app/TaskApp";
import { StyleSheet } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";

const initialState = {};
const reducer = (state = initialState) => {
  return state;
};
const store = createStore(reducer);
export default function App() {
  return (
    <Provider store={store}>
      <TaskApp />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
