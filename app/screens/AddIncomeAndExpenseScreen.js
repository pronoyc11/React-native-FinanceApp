import React, { useState } from "react";
import { Button } from "react-native";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addIorE } from "../redux/ActionCreator";

const AddIncomeAndExpenseScreen = (props) => {
  const [ammount, setAmmount] = useState("");
  const [feild, setFeild] = useState("");
  //DISPATCH AND STATE STARTS
  const dispatch = useDispatch();
  const state = useSelector((state) => state.finance);

  //DISPATCH AND STATE ENDS
  const postIncome = () => {
    if (!parseInt(ammount)) {
      alert("Please put a valid number to avoid mistakes!");
    } else {
   if(props.route.params.mode==="expense"&&state.totalIncome < parseInt(ammount)){
alert("You didn't add income enough to spend this much!");
return ;
   }
    const obj = {
      IEobj: {
        userId: state.userId,
        category: state.category,
        mode: props.route.params.mode,
        ammount: ammount,
        feild:feild,
        date: new Date(Date.now()).toDateString()
      },
      totalAmmount:
        props.route.params.mode === "income"
          ? parseInt(state.totalIncome) + parseInt(ammount)
          : parseInt(state.totalIncome) - parseInt(ammount),
      totalExpense:
        props.route.params.mode === "expense"
          ? parseInt(state.totalExpense) + parseInt(ammount)
          : parseInt(state.totalExpense),
    };
    dispatch(addIorE(obj));
   }
    
  };

  return (
    <View style={styles.totalContainer}>
      <TextInput
        placeholder={
          props.route.params.mode === "income"
            ? "Add the income source"
            : "Add the expense feild here"
        }
        style={styles.input}
        value={feild}
        onChangeText={(item) => {
          setFeild(item);
        }}
      />
      <TextInput
        placeholder="Add the ammount"
        value={ammount}
        style={styles.input}
        onChangeText={(item) => {
          setAmmount(item);
        }}
      />
      <Button
        title={
          props.route.params.mode === "income"
            ? "Add an income"
            : "Make an expense"
        }
        color={props.route.params.mode === "expense" && "red"}
        onPress={() => postIncome()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  totalContainer: {
    margin: 12,
    padding: 10,
    gap: 10,
  },
  input: {
    borderWidth: 1,
    height: 40,
    padding: 12,
  },
});

export default AddIncomeAndExpenseScreen;
