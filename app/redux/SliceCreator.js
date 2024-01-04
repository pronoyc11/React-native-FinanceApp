import { createSlice } from "@reduxjs/toolkit";
import {authUser } from "./ActionCreator";

const initialState = {
  userId: null,
  token: null,
  name: null,
  category: null,
  calculations: [],
  totalIncome: 0,
  totalExpense: 0,
  mode: "login",
};

const rootSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {
    changeMode: (state, action) => {
      state.mode = action.payload;
    },
    setRemainedCat: (state, action) => {
      state.category = action.payload;
    },
    addTotal: (state, action) => {
      state.totalIncome = action.payload;
    },
    addTotalExpense: (state, action) => {
      state.totalExpense = action.payload;
    },
    addCalculations: (state, action) => {
      
      state.calculations = state.calculations.concat(action.payload);
    },
    loadCalculations: (state, action) => {
      state.calculations = action.payload;
    },
    deleteCalculation: (state,action) =>{
      state.calculations = state.calculations.filter(item=> item.key !== action.payload);
    },
    addCategoryNormal:(state,action) =>{
      state.category = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(authUser.fulfilled, (state, action) => {
        const data = action.payload;
        state.userId = data.localId;
        state.token = data.idToken;
        state.name = data.email.split("@")[0];
      })
   
  },
});
export const {
  changeMode,
  setRemainedCat,
  addTotal,
  addTotalExpense,
  addCalculations,
  loadCalculations,
  deleteCalculation,
  addCategoryNormal
} = rootSlice.actions;
export default rootSlice.reducer;
