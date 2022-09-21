import { createSlice } from '@reduxjs/toolkit'

const initialState = {

  isLoaded: false,
  data: []

}

export const transactions = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    updateChannels: (state, action) => {
      return {
        isLoaded: true,
        data: action.payload

      }
    },
  },
})
// Action creators are generated for each case reducer function
export const { updateChannels } = transactions.actions

export default transactions.reducer