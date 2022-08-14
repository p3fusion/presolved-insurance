import { createSlice } from '@reduxjs/toolkit'

const initialState = {

  isLoaded: false,
  data: []

}

export const transactions = createSlice({
  name: 'merchants',
  initialState,
  reducers: {
    getTransactions: (state, action) => {
      return {
        ...state,
        transactions: {
          isLoaded: true,
          data: action.payload
        }
      }
    },
  },
})
// Action creators are generated for each case reducer function
export const { getTransactions } = transactions.actions

export default transactions.reducer