import { configureStore } from '@reduxjs/toolkit';
import doctorSlice from "./slices/doctorSlice";
import hospitalSlice from "./slices/hospitalSlice";


export const store = configureStore({
    reducer: {
        doctor: doctorSlice,
        hospital: hospitalSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;