import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  latitude:"",
  longitude:"",
}

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setCoordinates : (state, action)=>{
        const {latitude,longitude} = action.payload
        state.latitude = latitude;
        state.longitude = longitude
    }   
  },
})

export const { setCoordinates } = locationSlice.actions

export default locationSlice.reducer