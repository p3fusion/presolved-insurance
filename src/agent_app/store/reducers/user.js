import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedin: false,
  AppAuth: {
    isLoggedin: false,
  },
  connect:{
    isLoggedin: false,
  }

}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      return {
        ...state,
        isLoggedin: true,
        ...action.payload
      }
    },
    updateConnectUser: (state, action) => {
      return {
        ...state,
        isLoggedin: true,
        connect: {
          isLoggedin: true,
          ...action.payload
        }
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
export const { updateUser,updateAppUser,updateConnectUser } = userSlice.actions

export default userSlice.reducer