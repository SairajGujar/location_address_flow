import { configureStore } from '@reduxjs/toolkit'
import locationSlice  from './location/locationSlice'

export const store = configureStore({
  reducer: {
    location: locationSlice,
  },
})