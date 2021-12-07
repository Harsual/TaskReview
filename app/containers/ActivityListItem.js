import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

function ActivityListItem(props) {
  return (
    <View style={styles.itemView}>
      <TouchableOpacity>
        <Text style={styles.rating}> {props.rating}</Text>
        <Text style={styles.activityName}> {props.activityName}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  itemView: {
    width: "100%",
    height: 70,
    justifyContent: "center",
    marginBottom: 10,
    borderBottomWidth: 0.2,
  },

  activityName: {
    fontSize: 25,
    left: 20,
  },

  rating: {
    fontSize: 30,
    position: "absolute",
    right: 20,
  },
});

export default ActivityListItem;
