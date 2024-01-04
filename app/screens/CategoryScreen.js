import React from "react";
import {
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import categoryBg from "../images/categoryBg.jpg";
import { useDispatch, useSelector } from "react-redux";
import { CheckAndAddCategory, addCategory } from "../redux/ActionCreator";
import { addCategoryNormal } from "../redux/SliceCreator";
import { navigate } from "../NavigationRoot";

const CategoryScreen = () => {
  //Dispatch function and states start
  const dispatch = useDispatch();
  const states = useSelector(state =>state.finance);
  //Dispatch function and states end

  const selectCategory = (value) => {
    // if (states.mode === "signup") {
    //   dispatch(
    //     addCategory({
    //       name: states.name,
    //       userId: states.userId,
    //       category: value,
    //     })
    //   );
    // } else {
    //     dispatch(
    //         CheckAndAddCategory({
    //           name: states.name,
    //           userId: states.userId,
    //           category: value,
    //         },states.mode)
    //       );
    // }
    navigate("Home");
    dispatch(addCategoryNormal(value));
  };

  return (
    <View style={styles.logInview}>
      <ImageBackground
        source={categoryBg}
        blurRadius={10}
        style={{ ...styles.logInview, width: "100%", flex: 1 }}
      >
        <View style={styles.selectBox}>
          <Text style={styles.heading}>Select a category</Text>
          <TouchableOpacity
            onPress={() => {
              selectCategory("Ebl account");
            }}
          >
            <Text style={styles.itemStyle}>Ebl account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              selectCategory("Mtb account");
            }}
          >
            <Text style={styles.itemStyle}>Mtb account</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={()=>{selectCategory("Random")}}>

    <Text style={styles.itemStyle}>Random</Text>
    
</TouchableOpacity>
{/* <TouchableOpacity  onPress={()=>{selectCategory("Clothes")}}>

    <Text style={styles.itemStyle}>Clothes</Text>
    
</TouchableOpacity> */}
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  logInview: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    flexDirection: "column",
  },
  heading: {
    fontSize: 20,
    color: "#fff",
    backgroundColor: "#56f539",
    padding: 10,
    borderRadius: 4,
    marginBottom: 10,
  },
  selectBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    alignSelf: "center",
  },
  itemStyle: {
    width: 350,
    fontSize: 30,
    color: "#3BDD1B",
    backgroundColor: "#fff",
    textAlign: "center",
    margin: 10,
    borderRadius: 5,
    elevation: 5,
    padding: 10,
  },
});
export default CategoryScreen;
