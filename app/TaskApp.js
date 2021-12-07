import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PreviousTasksScreen from "./screens/PreviousTasksScreen";
import TasksDetailsScreen from "./screens/TasksDetailsScreen";
import ReviewTasksScreen from "./screens/ReviewTasksScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect } from "react";

const Stack = createStackNavigator();
export const ListContext = React.createContext();

export default function TaskApp() {
  const tempList = [];
  const [list, setList] = React.useState(tempList);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("List");
      if (jsonValue !== null) {
        const list = JSON.parse(jsonValue);
        setList(list);
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <ListContext.Provider
      value={{
        list: list,
        setList: setList,
      }}
    >
      <NavigationContainer>
        <Stack.Navigator initialRouteName="list">
          <Stack.Screen name="list" component={PreviousTasksScreen} />
          <Stack.Screen name="details" component={TasksDetailsScreen} />
          <Stack.Screen name="addReview" component={ReviewTasksScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ListContext.Provider>
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
