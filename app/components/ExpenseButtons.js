import React from 'react'
import { Button } from 'react-native'
import { StyleSheet } from 'react-native'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import { navigate } from '../NavigationRoot'

const ExpenseButtons = () => {
//DISPATCH AND STATES START
const state = useSelector(state=>state.finance);
//DISPATCH AND STATES END


  return (
    <View style={styles.btnContainer}>
        <View>

<Button title='Add income' onPress={()=>{
navigate("Income or Expense",{mode:"income"})
}} />
        </View>
        <View>

<Button title='Add expense' color={"red"} onPress={()=>{
navigate("Income or Expense",{mode:"expense"})
}} />
        </View>

    </View>
  )
}
const styles = StyleSheet.create({
    btnContainer:{
        borderBottomWidth:1,
        flexDirection:"row",
        gap:100,
        alignSelf:"center",
        margin:12,
        padding:10
    }
})

export default ExpenseButtons