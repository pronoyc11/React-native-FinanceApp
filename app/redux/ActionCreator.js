import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { navigate } from "../NavigationRoot";
import { baseUrl } from "../baseUrl";
import { addCalculations, addTotal, addTotalExpense, deleteCalculation, loadCalculations, setRemainedCat } from "./SliceCreator";


//AUTHENTICATION STARTS
export const authUser = createAsyncThunk("authUser", async (authObj) => {
  let url = "";
  const API = "AIzaSyBA5DWeXirJkDyzRp6nKofIyOt2aaI4tcE";
  if (authObj.mode === "signup") {
    url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
  } else {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
  }
  try {
    const response = await axios.post(url + API, authObj.user);
    
    const data = await response.data;
   
    navigate("Category");
    return data;
  } catch (error) {
    alert(error.message);
  }
});
//AUTHENTICATION ENDS
//Load OnLY INcomes ANd expenseS start
export const loadOnlyIE = (userId,category) =>dispatch =>{
  console.log('Heloo load only Incoe and expense')
  axios.get(baseUrl+userId+category+"onlyIE.json")
       .then(response=>{
        let calculationsArr = [];
         for(let keys in response.data) {
calculationsArr.push({...response.data[keys],key:keys});
         }

        dispatch(loadCalculations(calculationsArr));
       })
       .catch(error=>console.log(error));
}
//Load OnLY INcomes ANd expenseS end
//Add ONLY ALL INCOME AND EXPENSES START HERE
export const addOnlyIE = obj => dispatch =>{
  axios.post(baseUrl+obj.userId+obj.category +"onlyIE.json",obj)
       .then(response=>response.data)
       .then(data=>{
       dispatch(addCalculations(obj))
     
      
      })
       .catch(error=>console.log(error))
}
//Add ONLY ALL INCOME AND EXPENSES END HERE
//ADDING CATEGORY FOR SIGN UP STARTS
// export const addCategory = createAsyncThunk("addCategory", async (obj) => {
//   try {
//     let response = await axios.post(baseUrl + "categories.json", obj);
//     let result = await response.data;
//     navigate("Home");
//     return obj.category ;
//   } catch (error) {}
// });
//ADDING CATEGORY FOR SIGN UP ENDS
//ADDING CATEGORY IF NOT THERE FOR LOG IN STARTS
// export const CheckAndAddCategory = (obj,mode) => dispatch => {


//     axios.get(baseUrl + "categories.json")
//       .then(response => response.data)
//       .then(result=>{
//       //Variables start here
//       let isThere = false ;
//     //   let category = obj.category;
//       //Variables end here
//       //LOOPS START
//       for(let key in result){
//         if(obj.userId === result[key].userId){
//           if(obj.category === result[key].category){
//             isThere = true ;
//           }
//         }
//       }
//       //LOOPS END
//       //FINAL TOUCH STARTS
//       if(isThere){
        
//    dispatch(setRemainedCat(obj.category));
//    navigate("Home",{cat:obj.category});
//       }else{
        
//         dispatch(addCategory(obj))
//         navigate("Home",{cat:obj.category});
//       }
//       //FINAL TOUCH ENDS
//       })
//     .catch(error=>alert(error.message));

//   };
//ADDING CATEGORY IF NOT THERE FOR LOG IN ENDS

//ADDING TOTAL AMOUNT STARTS
export const addAtotal = (userId,category,obj) => dispatch =>{
  
  axios.put(baseUrl+userId+category+".json",obj)
    .then(response=> response.data)
    .then(data=>{
      
       dispatch(addTotal(obj.ammount))
      navigate("Home");
      })
    .catch(error=>console.log(error));
}
//ADDING TOTAL AMOUNT ENDS
//LOAD TOTAL EXPENSE START
export const loadTotalE = (userId,category)=> dispatch =>{
  axios.get(baseUrl+userId+category+"totalExpense.json")
  .then(response=>dispatch(addTotalExpense(response.data.ammount)))
  .catch(error=>{console.log(error);dispatch(addTotalExpense(0))})
}
//LOAD TOTAL EXPENSE END
//LOAD TOTAL STARTS
export const loadTotal = (userId,category) => dispatch =>{
  
  axios.get(baseUrl+userId+category+".json")
  .then(response=> response.data)
  .then(data=>{
    
     dispatch(addTotal(data.ammount))
     dispatch(loadTotalE(userId,category))
    })
  .catch(error=>{
    
    console.log(error);
    dispatch(addTotal(0))
  
  });
}
//LOAD TOTAL ENDS
//ADDING TOTAL EXPENSES START
export const addTotalE = (category,userId,ammount) => dispatch =>{
axios.put(baseUrl + userId + category + "totalExpense.json",{ammount:ammount})
   .then(response=>response.data)
   .then(data=>dispatch(addTotalExpense(ammount)))
   .catch(error=>console.log(error));

}

//ADDING TOTAL EXPENSES END


//ADDING INCOME OR EXPENSES START HERE
export const addIorE = obj => dispatch =>{

dispatch(addAtotal(obj.IEobj.userId,obj.IEobj.category,{ammount:obj.totalAmmount}));
if(obj.IEobj.mode==="expense"){
  dispatch(addTotalE(obj.IEobj.category,obj.IEobj.userId,obj.totalExpense));
}
dispatch(addOnlyIE(obj.IEobj));

}
//ADDING INCOME OR EXPENSES END HERE
//DELETING INCOME OR EXPENSE STARTS
export const deleteIorE = (obj) => dispatch =>{
  
  
  axios.delete(baseUrl+obj.userId+obj.category +"onlyIE/"+obj.key+".json")
        .then(response=>{
          dispatch(deleteCalculation(obj.key));
          dispatch(addTotalE(obj.category,obj.userId,obj.totalExpense));
          axios.put(baseUrl+obj.userId+obj.category+".json",{ammount:obj.totalIncome})
          .then(response=> response.data)
          .then(data=>{
            
             dispatch(addTotal(obj.totalIncome))
          
            })
          .catch(error=>console.log(error));
        })
        .catch(error=>console.log(error));
}
//DELETING INCOME OR EXPENSE ENDS