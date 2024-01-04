import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./SliceCreator";

const store = configureStore({
    reducer:{finance:rootReducer}
})

export default store ;