import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import mailSlice from "./mail-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
    reducer: {auth: authSlice.reducer, mail: mailSlice.reducer, ui: uiSlice.reducer}
})

export default store