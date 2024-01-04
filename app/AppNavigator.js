import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Constants from "expo-constants";
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';
import CategoryScreen from './screens/CategoryScreen';
import { useSelector } from 'react-redux';
import AddTotalScreen from './screens/AddTotalScreen';
import AddIncomeAndExpenseScreen from './screens/AddIncomeAndExpenseScreen';
import Icons from "react-native-vector-icons/FontAwesome";
import { navigate } from './NavigationRoot';
const Stack = createStackNavigator();

const AppNavigator = () => {

  const state = useSelector(state=> state.finance)

  return (
    <Stack.Navigator style={styles.view}>
      <Stack.Screen name='Log in' component={AuthScreen} />
     <Stack.Screen name='Home' component={HomeScreen} options={{
       headerLeft:()=><Text></Text>,
       headerTitle:` ${state.category}`,
       headerRight:()=>(<TouchableOpacity onPress={()=> navigate("Log in")}>
   <Icons name="power-off" size={26} style={{marginRight:20}} />
  </TouchableOpacity>
   )
  }} />
   
     <Stack.Screen name='Income or Expense' component={AddIncomeAndExpenseScreen} />
     <Stack.Screen name='Category' component={CategoryScreen} options={{
      headerLeft:()=><Text></Text>
     }} />
     <Stack.Screen name='Add Total' component={AddTotalScreen}  />
        </Stack.Navigator>
  )
}
const styles = StyleSheet.create({
  view:{

    paddingTop:Platform.OS === "ios"?0:Constants.statusBarHeight 
  }
})


export default AppNavigator;