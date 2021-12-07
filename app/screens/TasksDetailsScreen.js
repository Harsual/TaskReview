import React from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import ActivityListItem from "../containers/ActivityListItem";

function TasksDetailsScreen(props) {
  const par = props.route.params;

  const getName = (key) => {
    let activity = "error";

    switch (key) {
      case 1:
        activity = "Programming";
        break;
      case 2:
        activity = "Reading";
        break;
      case 3:
        activity = "Writing";
        break;
      case 4:
        activity = "Speaking";
        break;
      case 5:
        activity = "Physical Activity";
        break;
      case 6:
        activity = "Investment";
        break;
      case 7:
        activity = "Music";
        break;

      default:
        activity = "Error";
    }

    return activity;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topView}>
        <Text style={styles.totalRating}>{par.item.totalRating}</Text>
        <Text style={styles.fraction}>/7</Text>
      </View>
      <FlatList
        data={par.item.myList}
        renderItem={({ item }) => (
          <ActivityListItem
            activityName={getName(item.id)}
            rating={item.value}
            id={item.id}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },

  fraction: {
    position: "absolute",
    alignSelf: "center",
    right: 20,
    fontSize: 25,
    color: "#1DA1F2",
  },

  topView: {
    flexDirection: "row",
    justifyContent: "center",
  },

  item: {
    width: "100%",
    height: 70,
  },

  totalRating: {
    fontSize: 40,
    justifyContent: "center",
    color: "#1DA1F2",
  },

  title: {
    fontSize: 15,
    left: 20,
  },
});

export default TasksDetailsScreen;

/*const getRating = (key) => {
    const rating = props.item.myList.find((c) => c.key === key);
    return rating.value;
  };*/
