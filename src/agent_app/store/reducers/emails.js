import { createSlice } from '@reduxjs/toolkit'

const initialState = {

  isLoaded: false,
  data: []

}

export const emails = createSlice({
  name: 'emails',
  initialState,
  reducers: {
    updateEmails: (state, action) => {
      return {
        isLoaded: true,
        data: action.payload

      }
    },
  },
})
// Action creators are generated for each case reducer function
export const { updateEmails } = emails.actions

export default emails.reducer