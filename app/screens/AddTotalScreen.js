import React, { useState } from "react";
import { Button } from "react-native";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addAtotal } from "../redux/ActionCreator";

const AddTotalScreen = () => {
  const [total, setTotal] = useState("");
  //DISPATCH AND STATE STARTS
  const dispatch = useDispatch();
  const state = useSelector((state) => state.finance);
  

  //DISPATCH AND STATE ENDS
  const postTotal = () => {
    if (!parseInt(total)) {
      alert("Please put a valid number to avoid mistakes!");
    } else {
      dispatch(addAtotal(state.userId, state.category, { ammount: total }));
    }
  };

  return (
    <View style={styles.totalContainer}>
      {/* <TextInput placeholder='Add the Income Source' style={styles.input} /> */}
      <TextInput
        placeholder="Add the ammount"
        value={total}
        style={styles.input}
        onChangeText={(item) => {
        

                setTotal(item);
            
         
        }}
      />
      <Button title="Add total" onPress={() => postTotal()} />
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

export default AddTotalScreen;
