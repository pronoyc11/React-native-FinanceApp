import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { Button } from "react-native";
import { StyleSheet, Text, TextInput, View } from "react-native";
//import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from "react-redux";
import ExpenseButtons from "../components/ExpenseButtons";
import AllExpenses from "../components/AllExpenses";
import { useIsFocused } from "@react-navigation/native";
import { loadTotal, loadTotalE } from "../redux/ActionCreator";

const HomeScreen = (props) => {
  //DISPATCH AND STATES START
  const dispatch = useDispatch();
  const state = useSelector((state) => state.finance);
  //DISPATCH AND STATES END
  const isFocused = useIsFocused();
// const fastCategory = props.route.params.cat ;
// console.log(fastCategory);
  // USE EFFECT STARTS HERE
  useEffect(()=>{

    dispatch(loadTotal(state.userId,state.category));
    dispatch(loadTotalE(state.userId,state.category));
  },[])
  // USE EFFECT ENDS HERE

  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.income}
        colors={["#FAAD3D", "#EFC90A", "#F1CB0C"]}
      >
        <View style={styles.numberPart}>
          <View>
            <Text style={styles.total}>Total Income</Text>
            <Text style={{ ...styles.input, color: "#000", fontWeight: "400" }}>
              {`+`}
              <Text style={{ ...styles.input, color: "#2196F3" }}>
                {`${state.totalIncome} $`}{" "}
              </Text>
            </Text>
          </View>
          <View>
            <Text style={styles.total}>Total Expense</Text>
            <Text style={{ ...styles.input, color: "#000", fontWeight: "400" }}>
              {`-`}
              <Text style={{ ...styles.input, color: "red" }}>
                {`${state.totalExpense} $`}{" "}
              </Text>
            </Text>
          </View>
        </View>
        <View style={styles.numberPart}>
          <View
            style={{
              ...styles.wallet,
              borderColor: "#fff",
              borderWidth: 1,
              padding: 10,
            }}
          >
            <Text style={styles.wallet}>{`${state.name}'s`}</Text>
            <Text style={styles.wallet}> Wallet</Text>
          </View>
          <Button title={state.totalIncome===0?"Add a Total":"Update total"} color="#E10C62" onPress={()=>{
            props.navigation.navigate("Add Total");
          }} />
        </View>
      </LinearGradient>
      <View style={styles.expenses}>
      <ExpenseButtons />
      <AllExpenses />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {},
  income: {
    backgroundColor: "#56f539",
    height: 220,
    borderRadius: 10,
    width: "90%",
    alignSelf: "center",
    elevation: 5,
    marginTop: 9,
    flexDirection: "row",
    gap: 30,
  },
  expenses: {},
  input: {
    color: "#fff",
    fontSize: 22,
    marginTop: 5,
    fontWeight: "bold",
    textShadowColor:"#fff",
    textShadowRadius:5
  
  },
  // input:{
  //     height: 35,
  //     width:124,
  //     color:"#56f539",
  //     marginTop:10,
  //     borderWidth: 1,
  //     paddingLeft: 5,
  // elevation:5,
  // fontWeight:"bold",
  //     backgroundColor:"#fff",
  //     borderRadius:3,
  //     fontSize:20
  // },
  numberPart: {
    margin: 10,
    marginTop: 19,
    gap: 50,
  },
  total: {
    fontSize: 22,
    fontWeight: "bold",
    elevation: 10,
    color: "#fff",
  },
  wallet: {
    textAlign: "center",
    alignSelf: "center",
    alignItems: "center",
    fontSize: 20,
    fontWeight: "600",
    fontStyle: "italic",
  },
});
export default HomeScreen;
