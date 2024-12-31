import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  latitude:"",
  longitude:"",
}

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation : (state, action)=>{
        const {latitude,longitude} = action.payload
        state.latitude = latitude;
        state.longitude = longitude
    }   
  },
})

export const { setLocation } = locationSlice.actions

export default locationSlice.reducer