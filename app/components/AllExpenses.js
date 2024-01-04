import React, { useEffect } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { loadOnlyIE } from '../redux/ActionCreator';
import { useIsFocused } from '@react-navigation/native';
import Card from './Card';

const AllExpenses = () => {
const isFocused = useIsFocused();
  const states = useSelector(state=>state.finance);
  const dispatch = useDispatch();

  useEffect(()=>{
dispatch(loadOnlyIE(states.userId,states.category));
  },[isFocused])
 const calculationsArr = states.calculations;
 let showData = null ;
 if(calculationsArr.length > 0) {
    showData = (<FlatList data={calculationsArr} renderItem={({item})=><Card calculations={item} key={item.key} />} keyExtractor={()=>Date.now()*Math.random().toString()} />)
 }else{
  showData =<Text>Hellow {states.name},your expenses and income will appear here.</Text> 
 }
  return (
    <View style={styles.expenseContainer}>
       {showData}
    </View>
  )
}

const styles = StyleSheet.create({
    expenseContainer:{
    alignSelf:'center'
    }
})

export default AllExpenses