import React from "react";
import {
  FlatList,
  Text,
  StyleSheet,
  SafeAreaView,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";

import ListItem from "../containers/ListItem";
import { useContext } from "react";
import { ListContext } from "../TaskApp";
import AsyncStorage from "@react-native-async-storage/async-storage";

function PreviousTasksScreen(props) {
  //prevList = [];
  const listContext = useContext(ListContext);
  //const initialRender = useRef(true);

  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    return date + "/" + month + "/" + year; //format: dd-mm-yyyy;
  };

  const getTotalRating = (ratingList) => {
    let total = ratingList.reduce(function (prev, cur) {
      return prev + cur.value;
    }, 0);

    return total;
  };

  const longPressHandler = (id) => {
    const list = listContext.list.filter((c) => c.key !== id);
    listContext.setList(list);
    save(list);
  };

  const clearStorage = () => {
    AsyncStorage.clear();
    console.log("storage cleared");
  };

  const save = async (prevList) => {
    try {
      const jsonValue = JSON.stringify(prevList);
      await AsyncStorage.setItem("List", jsonValue);
    } catch (err) {
      alert(err);
    }
  };

  const pressHandler = (id) => {
    const lItem = listContext.list.find((c) => c.key === id);
    props.navigation.navigate("details", {
      item: lItem,
    });
  };

  const addReview = () => {
    let day = new Date().getDay();

    /*if (day === 0 || day === 6) {
      props.navigation.navigate("addReview");
    } else {
      alert("It's not the weekend! you can only add a review on weekends");
    }*/

    props.navigation.navigate("addReview");
  };

  const renderList = () => {
    if (listContext.list.length === 0)
      return (
        <Text style={styles.message}>
          The list empty. If it's the Weekend, you can add an item using the
          button below.
        </Text>
      );

    return (
      <FlatList
        data={listContext.list}
        renderItem={({ item }) => (
          <ListItem
            date={item.date}
            rating={item.totalRating}
            id={item.key}
            nav={props.navigation}
            onPress={pressHandler}
            onLongPress={longPressHandler}
          />
        )}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/*<Button title="clear Storage" onPress={() => clearStorage()}></Button>*/}

      {renderList()}

      <TouchableOpacity onPress={() => addReview()} style={styles.addButton}>
        <Text style={styles.plusSign}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },

  item: {
    width: "100%",
    height: 70,
  },

  title: {
    fontSize: 20,
    left: 20,
  },

  addButton: {
    position: "absolute",
    width: 75,
    height: 75,
    bottom: 30,
    right: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 75,
    backgroundColor: "#1DA1F2",
  },

  message: {
    fontSize: 40,
    textAlign: "center",
    justifyContent: "center",
    padding: 30,
  },

  plusSign: {
    fontSize: 75,
    height: 100,
    textAlign: "center",
    justifyContent: "center",
    color: "white",
  },
});

export default PreviousTasksScreen;
