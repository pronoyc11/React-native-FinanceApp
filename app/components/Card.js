import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteIorE } from "../redux/ActionCreator";
const Card = ({ calculations }) => {

   
  const colorOnmode = calculations.mode === "income" ? "#2196F3" : "red";


  
  const states = useSelector((state) => state.finance);
  const dispatch = useDispatch();


  let newTotalIncome = states.totalIncome ;
  let newTotalExpense = states.totalExpense ;
  if(calculations.mode === "expense"){
   
   newTotalExpense = parseInt(states.totalExpense) - parseInt(calculations.ammount)
   if(parseInt(states.totalExpense) < parseInt(calculations.ammount)){
    newTotalExpense = 0 ;
   }
  }else if(calculations.mode==="income"){
      newTotalIncome = parseInt(states.totalIncome) - parseInt(calculations.ammount);
      if(parseInt(states.totalIncome) < parseInt(calculations.ammount)){
        newTotalIncome = 0 ;
       }
  }
  const delObj = {
    userId: states.userId,
    category: states.category,
    totalIncome:newTotalIncome,
    totalExpense:newTotalExpense,
    key: calculations.key,
  };


  return (
    <View style={{ ...styles.calContainer, borderColor: colorOnmode }}>
      <Text style={{ fontSize: 16 }}>{calculations.feild}</Text>
      <Text>{calculations.date}</Text>
      <Text style={{ fontSize: 16, color: colorOnmode }}>
        {calculations.mode === "income" ? "+" : "-"} {calculations.ammount} $
      </Text>
      <TouchableOpacity
        onPress={() => {
          dispatch(deleteIorE(delObj));
        }}
      >
        <AntDesign name="delete" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  calContainer: {
    flexDirection: "row",
    gap: 30,
    margin: 5,
    padding: 15,
    borderRadius: 5,
    elevation: 3,
  },
});
export default Card;
