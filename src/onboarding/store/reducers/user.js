import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedin: false,
  AppAuth: {
    isLoggedin: false,
  }

}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      return {
        isLoggedin: true,
        ...action.payload
      }
    },
    updateAppUser: (state, action) => {
      return {
        ...state,
        AppAuth: {
          isLoggedin: true,
          ...action.payload
        }
      }
    },
  },
})
// Action creators are generated for each case reducer function
export const { updateUser,updateAppUser } = userSlice.actions

export default userSlice.reducer