import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

function ListItem(props) {
  const date = props.date;
  const rating = props.rating;

  return (
    <View style={styles.itemView}>
      <TouchableOpacity
        onPress={() => props.onPress(props.id)}
        onLongPress={() => props.onLongPress(props.id)}
      >
        {/*<Text style={styles.rating}> {rating}</Text>*/}
        <View style={styles.roundedBox}>
          <Text style={styles.rating}>{rating}</Text>
        </View>
        <Text style={styles.date}> {date}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  itemView: {
    //backgroundColor: "#5AF0D8",
    width: "100%",
    height: 70,
    justifyContent: "center",
    marginBottom: 10,
    borderBottomWidth: 0.2,
  },

  date: {
    fontSize: 30,
    left: 20,
  },

  roundedBox: {
    position: "absolute",
    height: 30,
    width: 50,
    right: 20,
    borderRadius: 10,
    backgroundColor: "#1DA1F2",
    justifyContent: "center",
    alignItems: "center",
  },

  rating: {
    fontSize: 20,
    color: "white",
    alignSelf: "center",
  },
});

export default ListItem;
