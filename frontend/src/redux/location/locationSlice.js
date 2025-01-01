import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  locationString: localStorage.getItem('locationString') || null,
  lat: localStorage.getItem('lat') || null,
  lng: localStorage.getItem('lat') || null,
};


const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation: (state, action) => {
      const { locationString, lat, lng } = action.payload;
      localStorage.setItem('locationString', locationString);
      localStorage.setItem('lat', lat);
      localStorage.setItem('lng', lng);
      state.locationString = locationString;
      state.lat = lat;
      state.lng = lng;
    },
  },
});

export const { setLocation } = locationSlice.actions;

export default locationSlice.reducer;
