import React, { Component } from "react";
import {
  ScrollView,
  Button,
  Text,
  StyleSheet,
  SafeAreaView,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ReviewItem from "../containers/ReviewItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ListContext } from "../TaskApp";

class ReviewTasksScreen extends Component {
  state = {
    myList: [
      { id: 1, title: "Programming", value: 3 },
      { id: 2, title: "Reading", value: 3 },
      { id: 3, title: "Writing", value: 3 },
      { id: 4, title: "Speaking", value: 3 },
      { id: 5, title: "Physical Activity", value: 3 },
      { id: 6, title: "Invesment", value: 3 },
      { id: 7, title: "Music", value: 3 },
    ],
    isSliding: false,
  };

  //c = React.useContext(CountContext);

  constructor() {
    super();
  }

  save = async (prevList) => {
    try {
      const jsonValue = JSON.stringify(prevList);
      await AsyncStorage.setItem("List", jsonValue);
    } catch (err) {
      alert(err);
    }
  };

  handleCallback = (reviewItem) => {
    const myList = [...this.state.myList];
    const index = myList.indexOf(reviewItem);
    myList[index] = { ...reviewItem };
    this.setState({ myList });
  };

  setIsSliding = (isSliding) => {
    this.setState({ isSliding: isSliding });
  };

  deleteExtra = (rItem) => {
    delete rItem.title;
  };

  addToList = (context) => () => {
    const saveList = this.state.myList.map(({ id, value }) => ({ id, value }));
    let myObject = {
      date: "",
      key: "",
      myList: "",
      totalRating: 0,
    };

    myObject.date = getCurrentDate();
    if (context.list.length === 0) {
      myObject.key = "0";
    } else {
      myObject.key = (parseInt(context.list[0].key) + 1).toString();
    }

    myObject.totalRating = getTotalRating(saveList);
    myObject.myList = saveList;
    const tempList = [myObject, ...context.list];
    this.save(tempList);
    context.setList(tempList);
    this.props.navigation.navigate("list");
  };
  render() {
    return (
      <ListContext.Consumer>
        {(listContext) => {
          return (
            <SafeAreaView style={styles.container}>
              <ScrollView scrollEnabled={!this.state.isSliding}>
                {this.state.myList.map((item) => (
                  <ReviewItem
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    value={item.value}
                    item={item}
                    handleChange={this.handleCallback}
                    handleSliding={this.setIsSliding}
                  />
                ))}
              </ScrollView>
              {/*<Button
                title="Save"
                onPress={this.addToList(listContext)}
              ></Button>*/}

              <TouchableOpacity
                style={styles.button}
                onPress={this.addToList(listContext)}
              >
                <Text style={styles.checkMark}>✓</Text>
              </TouchableOpacity>
            </SafeAreaView>
          );
        }}
      </ListContext.Consumer>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    width: 75,
    height: 75,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    alignSelf: "center",
    bottom: 15,
    backgroundColor: "#1DA1F2",
  },

  checkMark: {
    fontSize: 60,

    textAlign: "center",
    justifyContent: "center",

    color: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default ReviewTasksScreen;
