import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";

class ReviewItem extends Component {
  //tColor = "";
  state = {
    tColor: "#FFCC33",
  };

  handle = (val) => {
    this.props.item.value = val;
    let tColor = "";

    switch (true) {
      case val > 5:
        tColor = "green";
        break;
      case val > 2 && val < 6:
        tColor = "#FFCC33";
        break;
      case val < 3:
        tColor = "red";
        break;
      default:
        tColor = "black";
    }
    //console.log(tColor);
    this.setState({ tColor });
    this.props.handleChange(this.props.item);
  };

  isSlidingCallBack = (isSliding) => {
    this.props.handleSliding(isSliding);
  };

  /*findColor = (val) => {
    let tColor = "";
    switch (val) {
      case val > 5:
        tColor = "green";
        break;
      case val > 2 && val < 6:
        tColor = "#FFCC33";
        break;
      case val < 3:
        tColor = "red";
        break;
      default:
        tColor = "black";
    }

    return tColor;
  };*/

  render() {
    let sliding = false;
    return (
      <View style={styles.container}>
        <Text style={styles.activity}>{this.props.title}</Text>
        <Slider
          value={this.props.value}
          maximumValue={7}
          onSlidingStart={() => this.isSlidingCallBack(!sliding)}
          onSlidingComplete={() => this.isSlidingCallBack(sliding)}
          style={styles.slider}
          step={1}
          minimumTrackTintColor={"#1DA1F2"}
          thumbTintColor={"#1DA1F2"}
          onValueChange={(value) => this.handle(value)}
        ></Slider>
        <View
          style={[styles.roundedBox, { backgroundColor: this.state.tColor }]}
        >
          <Text style={styles.number}>{this.props.value}</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginBottom: 50,
  },

  slider: {
    marginLeft: 50,
    marginRight: 50,
    alignItems: "stretch",
  },

  activity: {
    fontSize: 22,
    textAlign: "center",
  },

  number: {
    fontSize: 25,
    textAlign: "center",
    color: "white",
  },

  roundedBox: {
    height: 35,
    width: 50,
    borderRadius: 10,
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
  },
});

export default ReviewItem;
